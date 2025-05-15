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
import { ApiProvider } from "@/context/GlobalApis/ApiContext";
import { AuthProvider, useAuth } from "@/context/GlobalApis/AuthContext";
import { EvaProvider } from "@/context/EvaContext/EvaContext";
import { UserSessionInfoProvider } from "@/context/GlobalApis/UserSessionInfoContext";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const publicRoutes = ["/login"]; // Define rutas públicas aquí

function AppContent({ Component, pageProps }: AppProps) {
  const { validateToken, isAuthenticated } = useAuth(); // Usa el AuthContext para verificar autenticación
  const nextRouter = useRouter();
  const isPublicRoute = publicRoutes.includes(nextRouter.pathname);
  const [isRedirecting, setIsRedirecting] = useState(false); // Nuevo estado para controlar la redirección

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isPublicRoute) {
    
        return;
      }

      if (isAuthenticated === false) {
      
        const isValid = await validateToken();
        if (!isValid) {
      
          if (!isRedirecting) {
            setIsRedirecting(true);
            nextRouter.push("/login");
          }
        }
        return;
      }
    }
    checkAuthentication();
  }, [isPublicRoute, isAuthenticated, nextRouter, isRedirecting, validateToken]);

  if (isAuthenticated === null) {
    // Muestra un indicador de carga mientras se valida el estado de autenticación
    return <div>Cargando...</div>;
  }

  if (isAuthenticated === false && !isPublicRoute) {
    // Evita renderizar mientras redirige
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <UserSessionInfoProvider>
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
      </UserSessionInfoProvider>
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