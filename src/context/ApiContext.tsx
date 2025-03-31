import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";

interface ApiContextType {
  materials: any;
  derivatives: any;
  resistances: any;
  corrugated: any;
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<any>(null);
  const [derivatives, setDerivatives] = useState<any>(null);
  const [resistances, setResistances] = useState<any>(null);
  const [corrugated, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      setError(null);

      try {
        const materialsData = await fetch(process.env.NEXT_PUBLIC_API_URL_MATERIALS || "").then((res) => res.json());
        const derivativesData = await fetch(process.env.NEXT_PUBLIC_API_URL_DERIVATIVES || "").then((res) => res.json());
        const resistancesData = await fetch(process.env.NEXT_PUBLIC_API_URL_RESISTANCES || "").then((res) => res.json());
        const corrugatedData = await fetch(process.env.NEXT_PUBLIC_API_URL_CATEGORIES || "").then((res) => res.json());

        setMaterials(materialsData);
        setDerivatives(derivativesData);
        setResistances(resistancesData);
        setCategories(corrugatedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <ApiContext.Provider value={{ materials, derivatives, resistances, corrugated, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};