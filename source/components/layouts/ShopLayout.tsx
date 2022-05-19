import Head from "next/head"
import { FC, ReactNode } from "react";
import { Navbar, SideMenu } from "../ui";

interface IProps {
  title: string;
  children?: ReactNode | undefined;
  imageFullUrl?: string | undefined;
  pageDescription: string;
}

export const ShopLayout: FC<IProps> = (
  { children, title, pageDescription, imageFullUrl }
) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={pageDescription}/>

        <meta name="og:title" content={title}/>
        <meta name="og:description" content={pageDescription}/>
        { imageFullUrl && <meta name="og:image" content={imageFullUrl}/> }
      </Head>
      <nav>
        <Navbar />
      </nav>
      
      <SideMenu />

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0 30px'
      }}>
        { children }
      </main>

      {/* Footer */}
      <footer>
        {/* Custom Footer */}
      </footer>
    </>
  )
}
