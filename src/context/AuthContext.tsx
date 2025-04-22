import React, { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token);
 // Verifica el almacenamiento
    setIsAuthenticated(true);
    router.push("/dashboard"); // Redirige al dashboard después del login
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login"); // Redirige al login después del logout
  };

  useEffect(() => {
    const validateToken = async (token: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/auth/validate-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Token inválido o expirado");
        }
  
      
      
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error al validar el token:", err);
        handleLogout(); // Si el token no es válido, cierra la sesión
      }
    };
  
    const token = localStorage.getItem("authToken");
  
    if (token) {
     
      validateToken(token); // Valida el token con el backend
    } else {
      console.log("Sin  token");
    }
  }, []);
  


  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
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