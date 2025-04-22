import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme/theme";
import { SelectedValuesProvider } from "@/context/CardBoardContext/SelectedValuesContext";
import { MeasuresProvider } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { FEEPProvider } from "@/context/FEEPContext/FEEPContext";
import { PalletsProvider } from "@/context/PalletsContext/PalletsContext";
import { FoamColorsProvider } from "@/context/Foam/FoamColorsContext";
import { FoamProvider } from "@/context/Foam/FoamContext";
import { PolybubbleProvider } from "@/context/PolybubbleContext/PolybubbleContext";
import { ApiProvider } from "@/context/ApiContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { EvaProvider } from "@/context/EvaContext/EvaContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const publicRoutes = ["/login"]; // Define rutas públicas aquí

function AppContent({ Component, pageProps }: AppProps) {
  const { isAuthenticated } = useAuth(); // Usa el AuthContext para verificar autenticación
  const nextRouter = useRouter();
  const isPublicRoute = publicRoutes.includes(nextRouter.pathname);

  useEffect(() => {
    if (isAuthenticated === false && !isPublicRoute) {
      console.log("Usuario no autenticado, redirigiendo al login");
      nextRouter.push("/login");
    }
  }, [isAuthenticated, isPublicRoute, nextRouter]);

  if (isAuthenticated === false && !isPublicRoute) {
    // Evita renderizar mientras redirige
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <EvaProvider>
        <PolybubbleProvider>
          <FoamProvider>
            <FoamColorsProvider>
              <PalletsProvider>
                <FEEPProvider>
                  <MeasuresProvider>
                    <SelectedValuesProvider>
                      <ApiProvider>
                        {isPublicRoute ? (
                          <Component {...pageProps} />
                        ) : (
                          <Layout>
                            <Component {...pageProps} />
                          </Layout>
                        )}
                      </ApiProvider>
                    </SelectedValuesProvider>
                  </MeasuresProvider>
                </FEEPProvider>
              </PalletsProvider>
            </FoamColorsProvider>
          </FoamProvider>
        </PolybubbleProvider>
      </EvaProvider>
    </ThemeProvider>
  );
}

function MyApp(props: AppProps) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  );
}

export default MyApp;