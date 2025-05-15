import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

interface UserSessionInfoContextType {
  email: string | null;
  role: string | null;
  employeeId: number | null;
  isAuthenticated: boolean;
}

const UserSessionInfoContext = createContext<UserSessionInfoContextType | undefined>(undefined);

export const UserSessionInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth(); // Consume el objeto user completo desde AuthContext

  // Validación explícita de los campos
  const email = typeof user?.email === "string" ? user.email : null; // Asegúrate de que sea un string o null
  const role = typeof user?.role === "string" ? user.role : null; // Asegúrate de que sea un string o null
  const employeeId = typeof user?.employee_id === "number" ? user.employee_id : null; // Asegúrate de que sea un número o null

  // Asegúrate de que isAuthenticated sea un booleano
  const isAuth = !!isAuthenticated;

  return (
    <UserSessionInfoContext.Provider value={{ email, role, employeeId, isAuthenticated: isAuth }}>
      {children}
    </UserSessionInfoContext.Provider>
  );
};

export const useUserSessionInfo = () => {
  const context = useContext(UserSessionInfoContext);
  if (!context) {
    throw new Error("useUserSessionInfo must be used within a UserSessionInfoProvider");
  }
  return context;
};