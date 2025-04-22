import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/derivatives";

interface Derivative {
  derivativeid?: number; // Opcional porque no estará presente al crear un nuevo registro
  name: string;
  materialid: number;
}

export const useDerivatives = () => {
  const [columns, setColumns] = useState<(keyof Derivative)[]>([]);
  const [data, setData] = useState<Derivative[]>([]);
  const [formData, setFormData] = useState<Derivative>({
    name: "",
    materialid: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<Derivative[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Derivative)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Derivative) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<Derivative>(API_URL, newRecord, {
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
  const updateRecord = async (updatedRecord: Derivative) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<Derivative>(
        `${API_URL}/${updatedRecord.derivativeid}`,
        updatedRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.map((row) => (row.derivativeid === updatedRecord.derivativeid ? response.data : row)));
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: Derivative) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/${row.derivativeid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.derivativeid !== row.derivativeid));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Abrir el diálogo para crear o editar
  const openDialog = (row?: Derivative) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        name: "",
        materialid: 0,
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      name: "",
      materialid: 0,
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