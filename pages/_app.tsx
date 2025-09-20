import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const siteTitle = 'Jom Smith — Cloud & Security'
  const siteDesc = 'AWS projects, notes, and experiments. Auto-deployed with Amplify.'
  const siteUrl = 'https://main.d23t4rsb39bhmg.amplifyapp.com' // replace with your custom domain later
  const ogImage = '/logo.svg' // replace with /og.png (1200x630) if you add one

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <link rel="icon" href="/logo.svg" />

        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
