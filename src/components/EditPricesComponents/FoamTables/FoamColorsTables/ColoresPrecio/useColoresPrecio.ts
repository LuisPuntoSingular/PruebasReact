import { useState, useEffect } from "react";
import axios from "axios";
import { useColoresFoam } from "../ColoresFoam/useColoresFoam"; // Importa el hook de ColoresFoam


const API_URL = "https://backnode-production.up.railway.app/api/coloresprecio";

interface ColoresPrecio {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medida: string;
  precio: number;
  idcoloresfoam: string | number;
}

export const useColoresPrecio = () => {
  const [columns, setColumns] = useState<(keyof ColoresPrecio)[]>([]); // Cambiar `any` a `(keyof ColoresPrecio)[]`
  const [data, setData] = useState<ColoresPrecio[]>([]); // Cambiar `any[]` a `ColoresPrecio[]`
  const [formData, setFormData] = useState<ColoresPrecio>({
    medida: "",
    precio: 0,
    idcoloresfoam: "0",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

// Obtener los datos de ColoresFoam
const { data: coloresFoamData } = useColoresFoam(); // Obtén los datos de ColoresFoam desde el hook



useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get<ColoresPrecio[]>(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length > 0) {
        // Crear un mapa para relacionar idcoloresfoam con el nombre del color
        const coloresFoamMap = new Map(
          coloresFoamData.map((color) => [color.id, color.color])
        );

        // Transformar los datos para reemplazar idcoloresfoam con el nombre del color
        const transformedData = response.data.map((item) => ({
          ...item,
          idcoloresfoam: coloresFoamMap.get(Number(item.idcoloresfoam)) || item.idcoloresfoam, // Reemplaza idcoloresfoam con el nombre
        }));

        setColumns(Object.keys(response.data[0]) as (keyof ColoresPrecio)[]);
        setData(transformedData);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  fetchData();
}, [coloresFoamData]); // Ejecutar cuando los datos de ColoresFoam cambien

  // Crear un nuevo registro
  const createRecord = async (newRecord: ColoresPrecio) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<ColoresPrecio>(API_URL, newRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData([...data, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: ColoresPrecio) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<ColoresPrecio>(
        `${API_URL}/${updatedRecord.id}`,
        updatedRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.map((row) => (row.id === updatedRecord.id ? response.data : row)));
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: ColoresPrecio) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Abrir el diálogo para crear o editar
  const openDialog = (row?: ColoresPrecio) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        medida: "",
        precio: 0,
        idcoloresfoam: "0",
      });
    }
  };

  



  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medida: "",
      precio: 0,
      idcoloresfoam: "0",
    });
    setIsEditing(false);
  };

  return {
    columns,
    data,
    formData,
    isEditing,
    handleInputChange,
    openDialog,
    createRecord,
    updateRecord,
    deleteRecord,
    resetForm,
  };
};