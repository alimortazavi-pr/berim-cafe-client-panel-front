import type { AppProps } from "next/app";

//Assets
import "@/assets/styles/globals.css";
import "@/assets/fonts/yekan-bakh/yekan-font.css";
//Swiper
import "swiper/css";
import "swiper/css/pagination";
//Toastify
import "react-toastify/dist/ReactToastify.css";
//NGProgress
import "@/assets/styles/nprogress.css";

//Components
import GlobalLayout from "@/components/GlobalLayout";

//Redux
import { Provider } from "react-redux";
import store from "@/store";

//NextUI
import { NextUIProvider } from "@nextui-org/react";
//Themes
import { ThemeProvider } from "next-themes";
import { lightTheme } from "@/common/styles/next-ui/lightModeTheme";
import { darkTheme } from "@/common/styles/next-ui/darkModeTheme";

//Transition
import { motion } from "framer-motion";

//Progress bar
import NProgress from "nprogress";
import { useEffect } from "react";
import { Router } from "next/router";

//Tools
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          defaultTheme="light"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <GlobalLayout>
              <motion.div
                key={router.route}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0.5,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </GlobalLayout>
          </NextUIProvider>
        </ThemeProvider>
        <ToastContainer theme="colored" rtl />
      </Provider>
    </>
  );
}
