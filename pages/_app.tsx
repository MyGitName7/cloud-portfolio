import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global <head> settings apply to all pages */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jom Smith — Cloud & Security Portfolio. AWS projects, notes, and experiments."
        />
        <link rel="icon" href="/logo.svg" />
        <title>Jom Smith — Cloud & Security</title>
      </Head>

      {/* Global Layout wraps every page */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
