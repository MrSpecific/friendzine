import Document, { Html, Head, Main, NextScript } from 'next/document';
import siteInfo from '@data/siteInfo';
import GoogleAnalytics from '@data/analytics';

const Body = ({ children }) => {
  return <body>{children}</body>;
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />

          <meta property="og:title" content={siteInfo.title} />
          <meta property="og:site_name" content={siteInfo.title} />
          <meta property="og:url" content={siteInfo.url} />
          <meta property="og:description" content={siteInfo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={siteInfo.opengraphImage} />
          <meta property="twitter:image" content={siteInfo.opengraphImage} />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

export default MyDocument;
