import Head from 'next/head'
import { AppProps } from 'next/app'

import '../../styles/card.css';
import '../../styles/globals.css'
import '../../styles/layout.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>ToDo - PWA</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#f2f2f2" />
      </Head>
      <AnyComponent {...pageProps} />
    </>
  )
}
