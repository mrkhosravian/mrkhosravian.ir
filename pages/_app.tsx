import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import moment from "moment-jalaali";


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  if (router.locale === "fa") {
    moment.loadPersian();
  }

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
