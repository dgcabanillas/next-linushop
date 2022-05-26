import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../source/components/cart';
import { ShopLayout } from '../../source/components/layouts';
import { CartContext } from '../../source/context';

const CartPage: NextPage = () => {

  const { isLoaded, cart } = useContext( CartContext );
  const router = useRouter();

  useEffect(() => {
    if ( isLoaded && cart.length === 0 ){
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router])
  
  if ( !isLoaded || cart.length === 0 ) return null;

  return (
    <ShopLayout 
      title='LinuShop | Carrito'
      pageDescription='Carrito de compras de la tienda'
    >
      <Typography variant='h1' component='h1'>Carrito</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{ my: 1 }}/>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color='secondary'
                  href='/checkout/address'
                  className='circular-btn'
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage;