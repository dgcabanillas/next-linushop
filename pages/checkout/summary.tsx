import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts'
import { CartList, OrderSummary } from '../../source/components/cart';

const SummaryPage: NextPage = () => {
  return (
    <ShopLayout 
      title='LinuShop | Órdenes de compra'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
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
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                >
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;