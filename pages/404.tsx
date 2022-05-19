import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../source/components/layouts';

const Custom404: NextPage = () => {
  return (
    <ShopLayout 
      title='Page not found'
      pageDescription='No se encontraron resultados'
    >
      <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <Typography 
          variant='h1' 
          component='h1'
          fontSize={100}
          fontWeight={400}
        >
          404
        </Typography>
        <Typography 
          fontSize={28}
        >
          No se encontraron resultados
        </Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404;
