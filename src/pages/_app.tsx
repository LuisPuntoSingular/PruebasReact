import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme/theme";
import { ApiProvider } from "@/context/ApiContext";
import { SelectedValuesProvider } from "@/context/CardBoardContext/SelectedValuesContext";
import { MeasuresProvider } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { FEEPProvider } from "@/context/FEEPContext/FEEPContext";

export default function App({ Component, pageProps }: AppProps) {

 // NEXT_PUBLIC_API_URL_MATERIALS=https://backnode-production.up.railway.app/api/materials
  //NEXT_PUBLIC_API_URL_DERIVATIVES=https://backnode-production.up.railway.app/api/derivatives
  //NEXT_PUBLIC_API_URL_RESISTANCES=https://backnode-production.up.railway.app/api/resistances
  //NEXT_PUBLIC_API_URL_CATEGORIES=https://backnode-production.up.railway.app/api/resistancescategories
return (
  <ThemeProvider theme={theme}>
    {/* Proveedor de tema para Material-UI */}
    <FEEPProvider>
    <MeasuresProvider>
    <SelectedValuesProvider>
    <ApiProvider>
    
    <Layout>
      <Component {...pageProps} />
    </Layout>
  
    </ApiProvider>
    </SelectedValuesProvider>
    </MeasuresProvider>
    </FEEPProvider>
    {/* Componente principal de la página */}
  </ThemeProvider>
  // Proveedor de tema para Material-UI
  );  

}