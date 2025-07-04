import { useState, useEffect } from "react";
import axios from "axios";
import { useColoresFoam } from "../ColoresFoam/useColoresFoam"; // Importa el hook de ColoresFoam

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coloresprecio`;

interface ColoresPrecio {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medida: string;
  precio: number;
  idcoloresfoam: string | number;
}

export const useColoresPrecio = () => {
  const [columns, setColumns] = useState<(keyof ColoresPrecio)[]>([]);
  const [data, setData] = useState<ColoresPrecio[]>([]);
  const [formData, setFormData] = useState<ColoresPrecio>({
    medida: "",
    precio: 0,
    idcoloresfoam: "0",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Obtener los datos de ColoresFoam
  const { data: coloresFoamData } = useColoresFoam();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ColoresPrecio[]>(API_URL, {
          withCredentials: true, // Incluir cookies en la solicitud
        });

        if (response.data.length > 0) {
          // Crear un mapa para relacionar idcoloresfoam con el nombre del color
          const coloresFoamMap = new Map(
            coloresFoamData.map((color) => [color.id, color.color])
          );

          // Transformar los datos para reemplazar idcoloresfoam con el nombre del color
          const transformedData = response.data.map((item) => ({
            ...item,
            idcoloresfoam: coloresFoamMap.get(Number(item.idcoloresfoam)) || item.idcoloresfoam,
          }));

          setColumns(Object.keys(response.data[0]) as (keyof ColoresPrecio)[]);
          setData(transformedData);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [coloresFoamData]);

  // Crear un nuevo registro
  const createRecord = async (newRecord: ColoresPrecio) => {
    try {
      const response = await axios.post<ColoresPrecio>(API_URL, newRecord, {
        withCredentials: true, // Incluir cookies en la solicitud
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
      const response = await axios.put<ColoresPrecio>(
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
  const deleteRecord = async (row: ColoresPrecio) => {
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