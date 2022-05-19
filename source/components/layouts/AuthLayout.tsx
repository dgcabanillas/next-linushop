import Head from 'next/head';
import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

interface IProps {
  title: string
}

export const AuthLayout = ({ children, title }: PropsWithChildren<IProps>) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>
      <main>
        <Box 
          display='flex' 
          alignItems='center'
          justifyContent='center' 
          height='calc(100vh - 200px)'
        >
          { children }
        </Box>
      </main>
    </>
  )
}
