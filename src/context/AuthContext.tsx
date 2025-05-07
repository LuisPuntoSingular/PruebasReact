import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
  login: (email: string, password: string) => Promise<void>;
  validateToken: (token: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const { token } = await response.json();
      handleLogin(token);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiration = payload.exp * 1000;
      return Date.now() > expiration;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return true;
    }
  };

  const validateToken = useCallback(async (token: string): Promise<boolean> => {
    if (isTokenExpired(token)) {
      console.log("El token ha expirado");
      handleLogout();
      return false;
    }

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
      return true;
    } catch (err) {
      console.error("Error al validar el token:", err);
      handleLogout();
      return false;
    }
  }, [handleLogout]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      validateToken(token);
    } else {
      console.log("Sin token");
    }
  }, [validateToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, login, validateToken }}>
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