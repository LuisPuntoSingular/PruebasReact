import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/poliburbuja`;

interface Poliburbuja {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  derivados: string;
}

export const usePoliburbuja = () => {
  const [columns, setColumns] = useState<(keyof Poliburbuja)[]>([]); // Cambiar `any` a `(keyof Poliburbuja)[]`
  const [data, setData] = useState<Poliburbuja[]>([]); // Cambiar `any[]` a `Poliburbuja[]`
  const [formData, setFormData] = useState<Poliburbuja>({
    derivados: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const response = await axios.get<Poliburbuja[]>(API_URL, {
          headers: {
            credentials: "include",
          },
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Poliburbuja)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Poliburbuja) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<Poliburbuja>(API_URL, newRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData([...data, response.data]); // Agrega el nuevo registro a los datos existentes
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: Poliburbuja) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<Poliburbuja>(
        `${API_URL}/${updatedRecord.id}`,
        updatedRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.map((row) => (row.id === updatedRecord.id ? response.data : row))); // Actualiza el registro en los datos existentes
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: Poliburbuja) => {
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
  const openDialog = (row?: Poliburbuja) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        derivados: "",
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      derivados: "",
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