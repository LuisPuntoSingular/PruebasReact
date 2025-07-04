import { useState, useEffect } from "react";
import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/resistances`;

interface Resistance {
  resistanceid?: number; // Opcional porque no estará presente al crear un nuevo registro
  ect: string;
  flute: string;
  resistances: string;
  pricem2: number;
  minimum: number;
  trim: number;
  categoryid: number;
}

export const useResistances = () => {
  const [columns, setColumns] = useState<(keyof Resistance)[]>([]);
  const [data, setData] = useState<Resistance[]>([]);
  const [formData, setFormData] = useState<Resistance>({
    ect: "",
    flute: "",
    resistances: "",
    pricem2: 0,
    minimum: 0,
    trim: 0,
    categoryid: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener datos de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Resistance[]>(API_URL, {
          withCredentials: true, // Incluir cookies en la solicitud
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof Resistance)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Crear un nuevo registro
  const createRecord = async (newRecord: Resistance) => {
    try {
      const response = await axios.post<Resistance>(API_URL, newRecord, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData([...data, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  };

  // Actualizar un registro existente
  const updateRecord = async (updatedRecord: Resistance) => {
    try {
      const response = await axios.put<Resistance>(
        `${API_URL}/${updatedRecord.resistanceid}`,
        updatedRecord,
        {
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      setData(data.map((row) => (row.resistanceid === updatedRecord.resistanceid ? response.data : row)));
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  // Eliminar un registro
  const deleteRecord = async (row: Resistance) => {
    try {
      await axios.delete(`${API_URL}/${row.resistanceid}`, {
        withCredentials: true, // Incluir cookies en la solicitud
      });
      setData(data.filter((item) => item.resistanceid !== row.resistanceid));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Abrir el diálogo para crear o editar
  const openDialog = (row?: Resistance) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      setFormData({
        ect: "",
        flute: "",
        resistances: "",
        pricem2: 0,
        minimum: 0,
        trim: 0,
        categoryid: 0,
      });
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      ect: "",
      flute: "",
      resistances: "",
      pricem2: 0,
      minimum: 0,
      trim: 0,
      categoryid: 0,
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