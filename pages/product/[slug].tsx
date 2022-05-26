import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts';
import { ProductSlideshow, SizeSelector } from '../../source/components/products';
import { ItemCounter } from '../../source/components/ui';
import { CartContext } from '../../source/context';
import { ICartProduct, IProduct, IProductSize } from '../../source/interfaces';
import { DBProducts } from '../../source/database';

interface IProps {
  product: IProduct
}

const ProductPage: NextPage<IProps> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = ( size: IProductSize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {
    if ( !tempCartProduct.size ) return;
    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout 
      title={product.title} 
      pageDescription={product.description}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images}/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>
            
            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10: product.inStock}
              />
              <SizeSelector 
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>

            {
              (product.inStock > 0) ? (
                <Button 
                  color="secondary" 
                  className='circular-btn'
                  onClick={ onAddProduct }
                >
                  {
                    tempCartProduct.size
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                  }
                </Button>
              ) : (
                <Chip label="No hay disponibles" color="error" variant='outlined' />
              )
            }
          
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await DBProducts.getAllProductSlugs();
  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await DBProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400 // 24 hrs
  }
}

export default ProductPage;