import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import moment from "moment-jalaali";
import "../styles/themes/atom-onedark.min.css";
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  if (router.locale === "fa") {
    moment.loadPersian();
  }

  return (
    <ThemeProvider attribute="class">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
