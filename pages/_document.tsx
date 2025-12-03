/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flushChunks,
  FlushedChunks,
  revalidate,
} from "@module-federation/nextjs-mf/utils";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { manrope } from "@/libs/font";

interface MyDocumentProps extends DocumentProps {
  chunks: any;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { chunks: any }> {
    if (ctx.pathname && !ctx.pathname.endsWith("_error")) {
      await revalidate().then((shouldUpdate) => {
        if (shouldUpdate) {
        }
      });
    }

    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html className={manrope.variable}>
        <Head>
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="pragma" content="no-cache" />
          <FlushedChunks chunks={(this.props as MyDocumentProps).chunks} />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/fav/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/fav/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/fav/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/fav/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/fav/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/fav/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/fav/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/fav/apple-touch-icon-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/fav/favicon-196x196.png"
            sizes="196x196"
          />
          <link
            rel="icon"
            type="image/png"
            href="/fav/favicon-160x160.png"
            sizes="160x160"
          />
          <link
            rel="icon"
            type="image/png"
            href="/fav/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/fav/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/fav/favicon-32x32.png"
            sizes="32x32"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
