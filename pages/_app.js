import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(
  //     <SessionProvider session={session}>
  //       <Component {...pageProps} />
  //     </SessionProvider>
  //   );
  // }

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
