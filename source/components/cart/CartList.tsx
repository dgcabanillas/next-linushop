import NextLink from 'next/link';
import { FC, useContext } from 'react';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { ItemCounter } from '../ui/ItemCounter';
import { CartContext } from '../../context';

interface IProps {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<IProps> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {
        productsToShow.map(product => {
          return (
            <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
              <Grid item xs={3}>
                <NextLink href={`/product/${ product.slug }`} passHref>
                  <Link>
                    <CardActionArea>
                      <CardMedia 
                        component='img'
                        image={product.image}
                        sx={{ borderRadius: '5px' }}
                      />
                    </CardActionArea>
                  </Link>
                </NextLink>
              </Grid>
              <Grid item xs={7}>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body1'>{product.title}</Typography>
                  <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>
                  {
                    editable ? (
                      <ItemCounter 
                        currentValue={ product.quantity }
                        maxValue={ 10 } 
                        updatedQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                      />
                    ) : (
                      <Typography variant='h6'>
                        { product.quantity } { product.quantity > 1 ? 'productos':'producto' }
                      </Typography>
                    )
                  }
                </Box>
              </Grid>
              <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
                <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                {
                  editable && (
                    <Button 
                      variant='text' 
                      color='secondary'
                      onClick={() => removeCartProduct( product as ICartProduct )}
                    >
                      Remover
                    </Button>
                  )
                }
              </Grid>
            </Grid>
          )
        })
      }
    </>
  )
}
