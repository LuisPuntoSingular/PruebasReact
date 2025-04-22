import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/coloresfoam";

// Definir la interfaz para los datos de la tabla
interface ColoresFoam {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  color: string;
  anchoplaca: string;
  largoplaca: string;
}

export const useColoresFoam = () => {
  const [columns, setColumns] = useState<(keyof ColoresFoam)[]>([]);

  const [data, setData] = useState<ColoresFoam[]>([]);
  const [formData, setFormData] = useState<ColoresFoam>({
    color: "",
    anchoplaca: "",
    largoplaca: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<ColoresFoam[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          // Filtrar las claves para que coincidan con las propiedades de `ColoresFoam`
          setColumns(Object.keys(response.data[0]) as (keyof ColoresFoam)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);
  // Crear un nuevo registro
  const createRecord = async (newRecord: ColoresFoam) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<ColoresFoam>(API_URL, newRecord, {
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
  const updateRecord = async (updatedRecord: ColoresFoam) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<ColoresFoam>(
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
  const deleteRecord = async (row: ColoresFoam) => {
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
  const openDialog = (row?: ColoresFoam) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        color: "",
        anchoplaca: "",
        largoplaca: "",
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      color: "",
      anchoplaca: "",
      largoplaca: "",
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