import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>API Documentation</title>
        <meta name="description" content="Documentation for the Registration and Data Records API" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}