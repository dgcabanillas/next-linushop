import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts';
import { ProductList } from '../../source/components/products';
import { FullScreenLoading } from '../../source/components/ui';
import { useProducts } from '../../source/hooks';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout 
      title='LinuShop | Niños y Niñas'
      pageDescription='Encuentra los mejores productos para niños y niñas'
    >
      <Typography variant='h1' component='h1'> Niños y Niñas </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}> Encuentra los mejores productos para niños y niñas </Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products}/>
      }
    </ShopLayout>
  )
}

export default KidPage;
