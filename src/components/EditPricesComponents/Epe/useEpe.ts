import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/epe`;

interface Epe {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: number;
}

export const useEpe = () => {
  const [columns, setColumns] = useState<(keyof Epe)[]>([]);
  const [data, setData] = useState<Epe[]>([]);
  const [formData, setFormData] = useState<Epe>({
    medidas: "",
    precio: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Epe[]>(API_URL, {
          withCredentials: true, // Incluir cookies en la solicitud
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Epe)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Epe) => {
    try {
      const response = await axios.post<Epe>(API_URL, newRecord, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData([...data, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: Epe) => {
    try {
      const response = await axios.put<Epe>(
        `${API_URL}/${updatedRecord.id}`,
        updatedRecord,
        {
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      setData(data.map((row) => (row.id === updatedRecord.id ? response.data : row)));
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: Epe) => {
    try {
      await axios.delete(`${API_URL}/${row.id}`, {
        withCredentials: true, // Incluir cookies en la solicitud
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
  const openDialog = (row?: Epe) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        medidas: "",
        precio: 0,
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medidas: "",
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