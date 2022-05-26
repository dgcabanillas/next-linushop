import type { NextPage, GetServerSideProps } from 'next';
import { Typography,Box } from '@mui/material';

import { ShopLayout } from '../../source/components/layouts';
import { ProductList } from '../../source/components/products';

import { DBProducts } from '../../source/database';
import { IProduct } from '../../source/interfaces';

interface IProps {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<IProps> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title={'LinuShop | Búsqueda'} pageDescription={'Encuentra los mejores productos aquí'}>
      <Typography variant='h1' component='h1'>Buscar productos</Typography>
      {
        foundProducts ? (
          <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { query }</Typography>
        ) : (
          <Box display='flex'>
            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
            <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
          </Box>
        )
      }
      <ProductList products={products} /> 
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if ( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await DBProducts.getProductsByTerm( query );
  const foundProducts = products.length > 0;

  if ( !foundProducts ) {
    products = await DBProducts.getProductsByTerm('shirt');
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage;
