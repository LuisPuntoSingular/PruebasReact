import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiContextType {
  materials: any;
  derivatives: any;
  resistances: any;
  corrugated: any;
  epe: any;
  foam: any;
  foamprecio:any
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

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      setError(null);

      try {
        const materialsData = await fetch(process.env.NEXT_PUBLIC_API_URL_MATERIALS || "").then((res) => res.json());
        const derivativesData = await fetch(process.env.NEXT_PUBLIC_API_URL_DERIVATIVES || "").then((res) => res.json());
        const resistancesData = await fetch(process.env.NEXT_PUBLIC_API_URL_RESISTANCES || "").then((res) => res.json());
        const corrugatedData = await fetch(process.env.NEXT_PUBLIC_API_URL_CATEGORIES || "").then((res) => res.json());

        const epeData = await fetch(process.env.NEXT_PUBLIC_API_URL_EPE || "").then((res) => res.json());
        
        const foamData = await fetch(process.env.NEXT_PUBLIC_API_URL_FOAM || "").then((res) => res.json());
        const foamPrecioData = await fetch(process.env.NEXT_PUBLIC_API_URL_FOAMPRECIO || "").then((res) => res.json());
        
        const coloresFoamData = await fetch(process.env.NEXT_PUBLIC_API_URL_COLORESFOAM || "").then((res) => res.json());
        const coloresPrecioData = await fetch(process.env.NEXT_PUBLIC_API_URL_COLORESPRECIO || "").then((res) => res.json());
       
       
       
       
        const poliburbujaData = await fetch(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJA || "").then((res) => res.json());
        const poliburbujapreciosData = await fetch(process.env.NEXT_PUBLIC_API_URL_POLIBURBUJAPRECIOS || "").then((res) => res.json());

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