import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme/theme";

export default function App({ Component, pageProps }: AppProps) {


return (
  <ThemeProvider theme={theme}>
    {/* Proveedor de tema para Material-UI */}
    <Layout>
      <Component {...pageProps} />
    </Layout>
    {/* Componente principal de la página */}
  </ThemeProvider>
  // Proveedor de tema para Material-UI
  );  

}