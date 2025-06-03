import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/materials`;

interface Material {
  materialid?: number; // Opcional porque no estará presente al crear un nuevo registro
  name: string;
}

export const useMaterials = () => {
  const [columns, setColumns] = useState<(keyof Material)[]>([]);
  const [data, setData] = useState<Material[]>([]);
  const [formData, setFormData] = useState<Material>({
    name: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Material[]>(API_URL, {
          withCredentials: true, // Incluir cookies en la solicitud
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Material)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Material) => {
    try {
      const response = await axios.post<Material>(API_URL, newRecord, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData([...data, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: Material) => {
    try {
      const response = await axios.put<Material>(
        `${API_URL}/${updatedRecord.materialid}`,
        updatedRecord,
        {
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      setData(data.map((row) => (row.materialid === updatedRecord.materialid ? response.data : row)));
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: Material) => {
    try {
      await axios.delete(`${API_URL}/${row.materialid}`, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData(data.filter((item) => item.materialid !== row.materialid));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Abrir el diálogo para crear o editar
  const openDialog = (row?: Material) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        name: "",
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      name: "",
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