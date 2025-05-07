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
import { useEffect,useState } from "react";

const publicRoutes = ["/login"]; // Define rutas públicas aquí

function AppContent({ Component, pageProps }: AppProps) {
  const { isAuthenticated, validateToken } = useAuth(); // Usa el AuthContext para verificar autenticación
  const nextRouter = useRouter();
  const isPublicRoute = publicRoutes.includes(nextRouter.pathname);
  const [isRedirecting, setIsRedirecting] = useState(false); // Nuevo estado para controlar la redirección

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        if (!isRedirecting) {
          console.log("No hay token, redirigiendo al login");
          setIsRedirecting(true); // Marca que ya se está redirigiendo
          nextRouter.push("/login");
        }
        return;
      }

      const isValid = await validateToken(token);
      if (!isValid && !isPublicRoute) {
        if (!isRedirecting) {
          console.log("Token inválido o expirado, redirigiendo al login");
          setIsRedirecting(true); // Marca que ya se está redirigiendo
          nextRouter.push("/login");
        }
      }
    };

    checkAuthentication();
  }, [isPublicRoute, nextRouter, validateToken, isRedirecting]);

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