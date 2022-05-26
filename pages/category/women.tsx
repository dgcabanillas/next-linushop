import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts';
import { ProductList } from '../../source/components/products';
import { FullScreenLoading } from '../../source/components/ui';
import { useProducts } from '../../source/hooks';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout 
      title='LinuShop | Mujeres'
      pageDescription='Encuentra los mejores productos para mujeres'
    >
      <Typography variant='h1' component='h1'> Mujeres </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}> Los mejores productos para ellas </Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products}/>
      }
    </ShopLayout>
  )
}

export default WomenPage;