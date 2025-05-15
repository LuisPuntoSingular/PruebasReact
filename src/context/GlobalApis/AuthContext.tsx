import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  role: string;
  employee_id?: number; // Opcional si no siempre está presente
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

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Incluye cookies en la solicitud
      });
      setIsAuthenticated(false); // Marca al usuario como no autenticado
      setUser(null); // Limpia el objeto user
      router.push("/login"); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Incluye cookies en la solicitud
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json(); // Extrae los datos de la respuesta
     

      setIsAuthenticated(true); // Marca al usuario como autenticado
      setUser(data.user); 
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const validateToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/auth/validate-token`, {
        method: "GET",
        credentials: "include", // Incluye cookies en la solicitud
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Si el token no es válido o ha expirado, marca como no autenticado
          setIsAuthenticated(false);
          setUser(null); // Limpia el objeto user
         
          return false;
        }
        throw new Error("Error al validar el token");
      }

      const data = await response.json(); // Extrae los datos del usuario
      setIsAuthenticated(true);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Error al validar el token:", err);
      setIsAuthenticated(false); // Marca como no autenticado en caso de error
      setUser(null);
      return false;
    }
  }, []);

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
    <AuthContext.Provider value={{ isAuthenticated: !!isAuthenticated, user,  handleLogout, login, validateToken }}>
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