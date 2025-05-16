import { useState, useEffect } from "react";
import axios from "axios";
import { useFoam } from "../Foam/useFoam";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/preciosfoam`;

// Define la interfaz para los datos
interface PreciosFoam {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: string;
  idfoam: string;
  ancho_rollo: string;
  largo_rollo: string;
}

export const usePreciosFoam = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<PreciosFoam[]>([]); // Cambiar `any[]` a `PreciosFoam[]`
  const [formData, setFormData] = useState<PreciosFoam>({
    medidas: "",
    precio: "",
    idfoam: "",
    ancho_rollo: "",
    largo_rollo: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: foamData } = useFoam();

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await axios.get<PreciosFoam[]>(API_URL, {
          headers: {
            credentials: "include",
          },
        });

        if (response.data.length > 0) {
          // Crear un mapa para relacionar idfoam con el nombre del foam
          const foamMap = new Map(
            foamData.map((foam) => [foam.id, foam.derivado])
          );

          // Transformar los datos para reemplazar idfoam con el nombre del foam
          const transformedData = response.data.map((item) => ({
            ...item,
            idfoam: foamMap.get(Number(item.idfoam)) || item.idfoam, // Reemplaza idfoam con el nombre
          }));

          setColumns(Object.keys(response.data[0]) as (keyof PreciosFoam)[]);
          setData(transformedData);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [foamData]); // Ejecutar cuando los datos de Foam cambien

  // Crear un nuevo registro
  const createRecord = async (newRecord: PreciosFoam) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post<PreciosFoam>(API_URL, newRecord, {
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
  const updateRecord = async (updatedRecord: PreciosFoam) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put<PreciosFoam>(
        `${API_URL}/${updatedRecord.id}`, // Asegúrate de que el ID esté presente en la URL
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
  const deleteRecord = async (row: PreciosFoam) => {
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
  const openDialog = (row?: PreciosFoam) => {
    if (row) {
      setIsEditing(true);
      setFormData(row);
    } else {
      setIsEditing(false);
      resetForm(); // Resetea el formulario para un nuevo registro
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medidas: "",
      precio: "",
      idfoam: "",
      ancho_rollo: "",
      largo_rollo: "",
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