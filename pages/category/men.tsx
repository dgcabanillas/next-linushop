import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts';
import { ProductList } from '../../source/components/products';
import { FullScreenLoading } from '../../source/components/ui';
import { useProducts } from '../../source/hooks';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout 
      title='LinuShop | Hombres'
      pageDescription='Encuentra los mejores productos para hombres'
    >
      <Typography variant='h1' component='h1'> Tienda </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Hombres</Typography>

      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products}/>
      }
    </ShopLayout>
  )
}

export default MenPage;