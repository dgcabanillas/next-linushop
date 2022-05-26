import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import { CartList, OrderSummary } from '../../source/components/cart';
import { ShopLayout } from '../../source/components/layouts'
import { IOrder } from '../../source/interfaces';
import { DBOrders } from '../../source/database';
import { linushopApi } from '../../source/api';

type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface IProps {
  order: IOrder;
}

const OrderPage: NextPage<IProps> = ({ order }) => {
  const router = useRouter();
  const { shippingAddress } = order;
  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async( details: OrderResponseBody ) => {
    if ( details.status !== 'COMPLETED' ) {
      return alert('No hay pago en Paypal');
    }

    setIsPaying(true);

    try {
      await linushopApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id
      });
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }
  }

  return (
    <ShopLayout 
      title='LinuShop | Orden 123456789'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Orden 123456789</Typography>

      {
        order.isPaid ? (
          <Chip 
            sx={{ my: 2 }}
            label="Orden ya fue pagada"
            variant='outlined'
            color="success"
            icon={ <CreditScoreOutlined /> }
          />
        ) : (
          <Chip 
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant='outlined'
            color="error"
            icon={ <CreditCardOffOutlined /> }
          />
        )
      }

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
              <Divider sx={{ my: 1 }}/>

              <Box display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
              <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
              <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
              <Typography>{ shippingAddress.country }</Typography>
              <Typography>{ shippingAddress.phone }</Typography>

              <Divider sx={{ my: 1 }}/>

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  total: order.total,
                  tax: order.tax,
                }}  
              />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Box
                  className='fadeIn'
                  justifyContent='center'
                  sx={{ display: isPaying ? 'flex': 'none' }}
                >
                  <CircularProgress />
                </Box>

                <Box flexDirection='column' sx={{ display: isPaying ? 'none': 'flex', flex: 1 }} >
                  {
                    order.isPaid ? (
                      <Chip 
                        sx={{ my: 2, px: 2 }}
                        label='Pagado'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                      />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${order.total}`,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompleted( details );
                          });
                        }}
                      />
                    )
                  }
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if ( !session ) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${ id }`,
        permanent: false,
      }
    }
  }

  const order = await DBOrders.getOrderById( id.toString() );

  if ( !order ) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      }
    }
  }

  if ( order.user !== session.user._id ) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      }
    }
  }

  return {
    props: {
      order
    }
  }
}

export default OrderPage;