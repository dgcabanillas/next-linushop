import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { lightTheme } from '../source/themes/light-theme';
import { UIProvider } from '../source/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <SWRConfig
        value={{
          //refreshInterval: 10000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </UIProvider>
  )
}

export default MyApp;
