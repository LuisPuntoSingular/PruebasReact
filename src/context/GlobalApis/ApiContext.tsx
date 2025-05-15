import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/GlobalApis/AuthContext"; // Importa el AuthContext
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
} from "../Interfaces/interfaces";

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
  const { isAuthenticated } = useAuth(); // Usa el estado de autenticación
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

   // Configurar Axios para incluir cookies en las solicitudes
   const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000", // URL base del backend
    withCredentials: true, // Incluye cookies en las solicitudes
  });


  // Cargar datos automáticamente al montar el componente si el usuario está autenticado
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const materialsData = await axiosInstance
          .get<Material[]>("/api/materials")
          .then((res) => res.data);
        const derivativesData = await axiosInstance
          .get<Derivative[]>("/api/derivatives")
          .then((res) => res.data);
        const resistancesData = await axiosInstance
          .get<Resistance[]>("/api/resistances")
          .then((res) => res.data);
        const corrugatedData = await axiosInstance
          .get<Category[]>("/api/resistancescategories")
          .then((res) => res.data);
        const epeData = await axiosInstance
          .get<Epe[]>("/api/epe")
          .then((res) => res.data);
        const evaData = await axiosInstance
          .get<Eva[]>("/api/eva")
          .then((res) => res.data);
        const foamData = await axiosInstance
          .get<Foam[]>("/api/foam")
          .then((res) => res.data);
        const foamPrecioData = await axiosInstance
          .get<FoamPrecio[]>("/api/preciosfoam")
          .then((res) => res.data);
        const coloresFoamData = await axiosInstance
          .get<FoamColor[]>("/api/coloresfoam")
          .then((res) => res.data);
        const coloresPrecioData = await axiosInstance
          .get<ColorPrecio[]>("/api/coloresprecio")
          .then((res) => res.data);
        const poliburbujaData = await axiosInstance
          .get<Polybubble[]>("/api/poliburbuja")
          .then((res) => res.data);
        const poliburbujapreciosData = await axiosInstance
          .get<PolybubblePrecio[]>("/api/poliburbujaprecios")
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
    };

    if (isAuthenticated) {
      fetchAllData(); // Solo carga los datos si el usuario está autenticado
    }
  }, [isAuthenticated]); // Ejecuta el efecto cuando cambia isAuthenticated

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