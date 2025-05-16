import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/eva`;

interface Eva {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medida: string;
  precio: number;
}

export const useEva = () => {
  const [columns, setColumns] = useState<(keyof Eva)[]>([]); // Cambiar `any` a `(keyof Eva)[]`
  const [data, setData] = useState<Eva[]>([]); // Cambiar `any[]` a `Eva[]`
  const [formData, setFormData] = useState<Eva>({
    medida: "",
    precio: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const response = await axios.get<Eva[]>(API_URL, {
          headers: {
           credentials: "include",
          },
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Eva)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Eva) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<Eva>(API_URL, newRecord, {
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
  const updateRecord = async (updatedRecord: Eva) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<Eva>(
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
  const deleteRecord = async (row: Eva) => {
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
  const openDialog = (row?: Eva) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        medida: "",
        precio: 0,
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medida: "",
      precio: 0,
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