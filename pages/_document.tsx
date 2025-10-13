import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="min-h-full">
        <Head>
          <link rel="icon" href="/logo.svg" />
          <meta name="theme-color" content="#0f172a" />
        </Head>
        <body className="min-h-full bg-white text-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
