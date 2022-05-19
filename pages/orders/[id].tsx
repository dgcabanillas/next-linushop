import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../source/components/layouts'
import { CartList, OrderSummary } from '../../source/components/cart';

const OrderPage: NextPage = () => {
  return (
    <ShopLayout 
      title='LinuShop | Orden 123456789'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Orden 123456789</Typography>

      {/* <Chip 
        sx={{ my: 2, px: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip 
        sx={{ my: 2, px: 2 }}
        label='Pagado'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography variant='subtitle1'>Dirección de entrega</Typography>
              <Typography>Diego Cabanillas</Typography>
              <Typography>En algún lugar</Typography>
              <Typography>Lima, 15001</Typography>
              <Typography>Perú</Typography>
              <Typography>+51960433912</Typography>

              <Divider sx={{ my: 1 }}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* TODO: PAGAR */}
                <h1>Pagar</h1>
                <Chip 
                  sx={{ my: 2, px: 2 }}
                  label='Pagado'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage;