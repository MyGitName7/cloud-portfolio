import Document, { Html, Head, Main, NextScript } from 'next/document'

const noFlashThemeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') { document.documentElement.classList.add('dark'); }
  } catch (_) { /* ignore */ }
})();
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon / OG image (replace later if you add a real og.png) */}
          <link rel="icon" href="/logo.svg" />
          <meta name="theme-color" content="#0f172a" />
          {/* Preload a system font for quick paint (optional) */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        </Head>
        <body>
          {/* Prevents flash by setting the class before React renders */}
          <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
