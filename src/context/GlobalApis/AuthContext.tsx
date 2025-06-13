import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface User {
  id: number;
  email: string;
  role: string;
  // Opcional si no siempre está presente
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: Record<string, User> | null;
  handleLogout: () => void;
  login: (email: string, password: string) => Promise<void>;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Inicializa como null
  const [user, setUser] = useState<Record<string, User> | null>(null); // Nuevo: estado para el objeto user
  const router = useRouter();

  // Configurar instancia de Axios
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000", // URL base del backend
    withCredentials: true, // Incluye cookies en las solicitudes
  });

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false); // Marca al usuario como no autenticado
      setUser(null); // Limpia el objeto user
      router.push("/login"); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const data = response.data; // Extrae los datos de la respuesta
      console.log("Datos del usuario:", data.user); // Verifica los datos del usuario
      setIsAuthenticated(true); // Marca al usuario como autenticado
      setUser(data.user); // Guarda los datos del usuario
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const validateToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.get("/auth/auth/validate-token");

      const data = response.data; // Extrae los datos del usuario
      setIsAuthenticated(true);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Error al validar el token:", error);
      setIsAuthenticated(false); // Marca como no autenticado en caso de error
      setUser(null);
      return false;
    }
  }, [axiosInstance]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isValid = await validateToken();
        setIsAuthenticated(isValid); // Actualiza el estado según la validación
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        setIsAuthenticated(false); // Si hay un error, marca como no autenticado
        setUser(null);
      }
    };

    if (isAuthenticated === null) {
      checkAuthentication(); // Solo valida si el estado es null
    }
  }, [isAuthenticated, validateToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!isAuthenticated,
        user,
        handleLogout,
        login,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};