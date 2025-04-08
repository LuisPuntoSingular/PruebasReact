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
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ApiProvider } from "@/context/ApiContext";

export default function App({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const router = useRouter();

 // Función para manejar el inicio de sesión
 const handleLogin = (token: string) => {
  const expirationTime = Date.now() + 20 * 60 * 1000; // 3 minutos en milisegundos
  localStorage.setItem("authToken", token); // Almacena el token en localStorage
  localStorage.setItem("authTokenExpiration", expirationTime.toString()); // Almacena el tiempo de expiración
  setIsAuthenticated(true);
  router.push("/dashboard"); // Redirige al dashboard después de iniciar sesión
};
  
  

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
      localStorage.removeItem("authToken"); // Elimina el token de localStorage
      localStorage.removeItem("authTokenExpiration"); // Elimina el tiempo de expiración
      setIsAuthenticated(false);
      router.push("/login"); // Redirige al login después de cerrar sesión
    };

  // Lista de rutas públicas
  const publicRoutes = ["/login"];

  // Redirige al login si no está autenticado y no está en una ruta pública
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("authTokenExpiration");

    if (token && expiration) {
      if (Date.now() > parseInt(expiration)) {
        // Si el token ha expirado, cierra sesión
        handleLogout();
      } else {
        setIsAuthenticated(true); // Si el token es válido, marca al usuario como autenticado
      }
    } else if (!publicRoutes.includes(router.pathname)) {
      router.push("/login"); // Redirige al login si no está autenticado y no está en una ruta pública
    }
  }, [router.pathname]);

  // Oculta el Layout en las rutas públicas
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <PolybubbleProvider>
        <FoamProvider>
          <FoamColorsProvider>
            <PalletsProvider>
              <FEEPProvider>
                <MeasuresProvider>
                  <SelectedValuesProvider>
                    <ApiProvider>
                      {/* Proveedor de API para manejar datos y autenticación */}
                    {isPublicRoute ? (
                      // Renderiza solo el componente (sin Layout) en rutas públicas
                      <Component
                        {...pageProps}
                        isAuthenticated={isAuthenticated}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                      />
                    ) : (
                      // Renderiza el Layout en rutas protegidas
                      <Layout>
                        <Component
                          {...pageProps}
                          isAuthenticated={isAuthenticated}
                          onLogin={handleLogin}
                          onLogout={handleLogout}
                        />
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
    </ThemeProvider>
  );
}