import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Material,
  Derivative,
  Resistance,
  Category,
  Epe,
  Eva,
  Foam,
  FoamPrecio,
  FoamColor,
  ColorPrecio,
  Polybubble,
  PolybubblePrecio,
} from "../context/Interfaces/interfaces";

interface ApiContextType {
  materials: Material[] | null;
  derivatives: Derivative[] | null;
  resistances: Resistance[] | null;
  corrugated: Category[] | null;
  epe: Epe[] | null;
  eva: Eva[] | null;
  foam: Foam[] | null;
  foamprecio: FoamPrecio[] | null;
  coloresFoam: FoamColor[] | null;
  coloresPrecio: ColorPrecio[] | null;
  poliburbuja: Polybubble[] | null;
  poliburbujaprecios: PolybubblePrecio[] | null;

  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<Material[] | null>(null);
  const [derivatives, setDerivatives] = useState<Derivative[] | null>(null);
  const [resistances, setResistances] = useState<Resistance[] | null>(null);
  const [corrugated, setCategories] = useState<Category[] | null>(null);
  const [epe, setEpe] = useState<Epe[] | null>(null);
  const [eva, setEva] = useState<Eva[] | null>(null);
  const [foam, setFoam] = useState<Foam[] | null>(null);
  const [foamprecio, setFoamprecio] = useState<FoamPrecio[] | null>(null);
  const [coloresFoam, setColoresFoam] = useState<FoamColor[] | null>(null);
  const [coloresPrecio, setColoresPrecio] = useState<ColorPrecio[] | null>(null);
  const [poliburbuja, setPoliburbuja] = useState<Polybubble[] | null>(null);
  const [poliburbujaprecios, setPoliburbujaprecios] = useState<PolybubblePrecio[] | null>(null);
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
        const materialsData = await axios
          .get<Material[]>(process.env.NEXT_PUBLIC_API_URL_MATERIALS!)
          .then((res) => res.data);
        const derivativesData = await axios
          .get<Derivative[]>(process.env.NEXT_PUBLIC_API_URL_DERIVATIVES!)
          .then((res) => res.data);
        const resistancesData = await axios
          .get<Resistance[]>(process.env.NEXT_PUBLIC_API_URL_RESISTANCES!)
          .then((res) => res.data);
        const corrugatedData = await axios
          .get<Category[]>(process.env.NEXT_PUBLIC_API_URL_CATEGORIES!)
          .then((res) => res.data);
        const epeData = await axios
          .get<Epe[]>(process.env.NEXT_PUBLIC_API_URL_EPE!)
          .then((res) => res.data);
          const evaData = await axios
          .get<Eva[]>(process.env.NEXT_PUBLIC_API_URL_EVA!)
          .then((res) => res.data);
        const foamData = await axios
          .get<Foam[]>(process.env.NEXT_PUBLIC_API_URL_FOAM!)
          .then((res) => res.data);
        const foamPrecioData = await axios
          .get<FoamPrecio[]>(process.env.NEXT_PUBLIC_API_URL_FOAMPRECIO!)
          .then((res) => res.data);
        const coloresFoamData = await axios
          .get<FoamColor[]>(process.env.NEXT_PUBLIC_API_URL_COLORESFOAM!)
          .then((res) => res.data);
        const coloresPrecioData = await axios
          .get<ColorPrecio[]>(process.env.NEXT_PUBLIC_API_URL_COLORESPRECIO!)
          .then((res) => res.data);
        const poliburbujaData = await axios
          .get<Polybubble[]>(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJA!)
          .then((res) => res.data);
        const poliburbujapreciosData = await axios
          .get<PolybubblePrecio[]>(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJAPRECIOS!)
          .then((res) => res.data);

        setMaterials(materialsData);
        setDerivatives(derivativesData);
        setResistances(resistancesData);
        setCategories(corrugatedData);
        setEpe(epeData);
        setEva(evaData);
        setFoam(foamData);
        setFoamprecio(foamPrecioData);
        setColoresFoam(coloresFoamData);
        setColoresPrecio(coloresPrecioData);
        setPoliburbuja(poliburbujaData);
        setPoliburbujaprecios(poliburbujapreciosData);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Error al cargar los datos");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
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
        eva,
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