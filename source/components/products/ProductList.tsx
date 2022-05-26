import { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from './';

interface IProps {
  products: IProduct[];
}

export const ProductList: FC<IProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {
        products.map( product => (
          <ProductCard 
            key={product.slug} 
            product={product}
          />
        ))
      }
    </Grid>
  )
}
