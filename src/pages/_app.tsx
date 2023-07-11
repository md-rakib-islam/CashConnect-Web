import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { AppProvider } from "../contexts/app/AppContext";
import { GlobalStyles } from "../utils/globalStyles";
import { theme } from "../utils/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:url" content="https://cashconnect.com.bd/landing" />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cash Connect BD" />
        <meta
          property="og:description"
          content="A relaiable home for buy, sell & exchange new or pre owned authentic products.

"
        />
        <meta
          property="og:image"
          content="/assets/images/landing/preview.png"
        />

        {/* Google analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SGG7GE7HZC');
          `,
          }}
        ></script>
        {/* facebook share content */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </Head>
      <GlobalStyles />
      <GoogleOAuthProvider clientId="1082909611954-d2cehkmk853q5643g2c1kibreq2a1e5e.apps.googleusercontent.com">
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
