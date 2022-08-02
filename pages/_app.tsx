import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { createContext } from "react";
import NavContextProvider from "../store/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavContextProvider>
        <Component {...pageProps} />
      </NavContextProvider>
    </Provider>
  );
}

export default MyApp;
