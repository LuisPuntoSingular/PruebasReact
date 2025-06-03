import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/poliburbujaprecios`;

interface PoliburbujaPrecio {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: number;
  idpoliburbuja: number;
  ancho_rollo: number;
  largo_rollo: number;
}

export const usePoliburbujaPrecios = () => {
  const [columns, setColumns] = useState<(keyof PoliburbujaPrecio)[]>([]);
  const [data, setData] = useState<PoliburbujaPrecio[]>([]);
  const [formData, setFormData] = useState<PoliburbujaPrecio>({
    medidas: "",
    precio: 0,
    idpoliburbuja: 0,
    ancho_rollo: 0,
    largo_rollo: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PoliburbujaPrecio[]>(API_URL, {
          withCredentials: true, // Incluir cookies en la solicitud
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof PoliburbujaPrecio)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: PoliburbujaPrecio) => {
    try {
      const response = await axios.post<PoliburbujaPrecio>(API_URL, newRecord, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData([...data, response.data]); // Agrega el nuevo registro a los datos existentes
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: PoliburbujaPrecio) => {
    try {
      const response = await axios.put<PoliburbujaPrecio>(
        `${API_URL}/${updatedRecord.id}`,
        updatedRecord,
        {
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      setData(data.map((row) => (row.id === updatedRecord.id ? response.data : row))); // Actualiza el registro en los datos existentes
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: PoliburbujaPrecio) => {
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
  const openDialog = (row?: PoliburbujaPrecio) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        medidas: "",
        precio: 0,
        idpoliburbuja: 0,
        ancho_rollo: 0,
        largo_rollo: 0,
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medidas: "",
      precio: 0,
      idpoliburbuja: 0,
      ancho_rollo: 0,
      largo_rollo: 0,
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