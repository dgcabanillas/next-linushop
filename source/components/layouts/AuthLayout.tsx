import Head from 'next/head';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface IProps {
  title: string;
  children?: ReactNode | undefined;
}

export const AuthLayout: FC<IProps> = ({ children, title }) => {
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
