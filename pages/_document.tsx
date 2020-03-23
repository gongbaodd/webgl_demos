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
