import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../source/components/layouts';
import { ProductList } from '../source/components/products';
import { FullScreenLoading } from '../source/components/ui';
import { useProducts } from '../source/hooks';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout 
      title='LinuShop | Home'
      pageDescription='Encuentra los mejores productos a los mejores precios'
    >
      <Typography variant='h1' component='h1'> Tienda </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products}/>
      }
    </ShopLayout>
  )
}

export default HomePage;
