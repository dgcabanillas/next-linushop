import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../source/components/layouts';
import { initialData } from '../source/database/products';
import { ProductList } from '../source/components/products';

const Home: NextPage = () => {
  return (
    <ShopLayout 
      title='LinuShop | Home'
      pageDescription='Encuentra los mejores productos a los mejores precios'
    >
      <Typography variant='h1' component='h1'> Tienda </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductList products={initialData.products as any}/>
    </ShopLayout>
  )
}

export default Home;
