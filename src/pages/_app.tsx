import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme/theme";
import { ApiProvider } from "@/context/ApiContext";
import { SelectedValuesProvider } from "@/context/CardBoardContext/SelectedValuesContext";
import { MeasuresProvider } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { FEEPProvider } from "@/context/FEEPContext/FEEPContext";
import { PalletsProvider } from "@/context/PalletsContext/PalletsContext";
import { FoamColorsProvider } from "@/context/Foam/FoamColorsContext";
import { FoamProvider } from "@/context/Foam/FoamContext";
import { PolybubbleProvider } from "@/context/PolybubbleContext/PolybubbleContext";


export default function App({ Component, pageProps }: AppProps) {




 return (
  <ThemeProvider theme={theme}>
    {/* Proveedor de tema para Material-UI */}
    <PolybubbleProvider>
    <FoamProvider>
    <FoamColorsProvider>
    <PalletsProvider>
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
    </PalletsProvider>
    </FoamColorsProvider>
    </FoamProvider>
    </PolybubbleProvider>
    {/* Componente principal de la página */}
  </ThemeProvider>
  // Proveedor de tema para Material-UI
  );  

}