import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Typography, Link } from '@mui/material';
import { ShopLayout } from '../../source/components/layouts'
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout 
      title='Carrito Vacío'
      pageDescription='No hay artículos en el carrito de compras'
    >
      <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Su carrito está vacío</Typography>
          <NextLink href='/' passHref>
            <Link typography='h6' color='primary' fontWeight={600}>
              Ir al inicio
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage;