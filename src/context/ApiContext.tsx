import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface ApiContextType {
  materials: any;
  derivatives: any;
  resistances: any;
  corrugated: any;
  epe: any;
  foam: any;
  foamprecio: any;
  coloresFoam: any;
  coloresPrecio: any;
  poliburbuja: any;
  poliburbujaprecios: any;
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<any>(null);
  const [derivatives, setDerivatives] = useState<any>(null);
  const [resistances, setResistances] = useState<any>(null);
  const [corrugated, setCategories] = useState<any>(null);
  const [epe, setEpe] = useState<any>(null);
  const [foam, setFoam] = useState<any>(null);
  const [foamprecio, setFoamprecio] = useState<any>(null);
  const [coloresFoam, setColoresFoam] = useState<any>(null);
  const [coloresPrecio, setColoresPrecio] = useState<any>(null);
  const [poliburbuja, setPoliburbuja] = useState<any>(null);
  const [poliburbujaprecios, setPoliburbujaprecios] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Configurar Axios para incluir el token JWT en las solicitudes
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000", // URL base del backend
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Cargar datos protegidos desde el backend
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      setError(null);

      try {
        const materialsData = await axios.get(process.env.NEXT_PUBLIC_API_URL_MATERIALS!).then((res) => res.data);
        const derivativesData = await axios.get(process.env.NEXT_PUBLIC_API_URL_DERIVATIVES!).then((res) => res.data);
        const resistancesData = await axios.get(process.env.NEXT_PUBLIC_API_URL_RESISTANCES!).then((res) => res.data);
        const corrugatedData = await axios.get(process.env.NEXT_PUBLIC_API_URL_CATEGORIES!).then((res) => res.data);
        const epeData = await axios.get(process.env.NEXT_PUBLIC_API_URL_EPE!).then((res) => res.data);
        const foamData = await axios.get(process.env.NEXT_PUBLIC_API_URL_FOAM!).then((res) => res.data);
        const foamPrecioData = await axios.get(process.env.NEXT_PUBLIC_API_URL_FOAMPRECIO!).then((res) => res.data);
        const coloresFoamData = await axios.get(process.env.NEXT_PUBLIC_API_URL_COLORESFOAM!).then((res) => res.data);
        const coloresPrecioData = await axios.get(process.env.NEXT_PUBLIC_API_URL_COLORESPRECIO!).then((res) => res.data);
        const poliburbujaData = await axios.get(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJA!).then((res) => res.data);
        const poliburbujapreciosData = await axios.get(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJAPRECIOS!).then((res) => res.data);

        setMaterials(materialsData);
        setDerivatives(derivativesData);
        setResistances(resistancesData);
        setCategories(corrugatedData);
        setEpe(epeData);
        setFoam(foamData);
        setFoamprecio(foamPrecioData);
        setColoresFoam(coloresFoamData);
        setColoresPrecio(coloresPrecioData);
        setPoliburbuja(poliburbujaData);
        setPoliburbujaprecios(poliburbujapreciosData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        materials,
        derivatives,
        resistances,
        corrugated,
        epe,
        foam,
        foamprecio,
        coloresFoam,
        coloresPrecio,
        poliburbuja,
        poliburbujaprecios,
        loading,
        error,
      }}
    >
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