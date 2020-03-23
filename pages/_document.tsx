import Document, { Html, Head, Main, NextScript } from "next/document";
import Manifest from "next-manifest/manifest";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <Manifest />
          <meta name="generator" content="Next" />
          <title>宫不上的WebGL实验室</title>
          <meta name="description" content="宫不上的WebGL实验室" />
          <meta property="og:title" content="宫不上的WebGL实验室" />
          <meta property="og:description" content="宫不上的WebGL实验室" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="gongbaodd" />
          <meta name="twitter:title" content="宫不上的WebGL实验室" />
          <meta name="twitter:description" content="宫不上的WebGL实验室" />
          <meta name="referrer" content="no-referrer" />
          <link
            rel="preconnect dns-prefetch"
            href="https://www.google-analytics.com"
          />
          <link rel="icon" href="/icons/icon-48x48.png" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="apple-touch-icon"
            sizes="48x48"
            href="/icons/icon-48x48.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="96x96"
            href="/icons/icon-96x96.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="/icons/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/icons/icon-384x384.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/icon-512x512.png"
          />
        </Head>
        <body style={{ background: "transparent" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
