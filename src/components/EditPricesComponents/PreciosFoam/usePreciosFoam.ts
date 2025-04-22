import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/preciosfoam";

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

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<PreciosFoam[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          // Convierte las claves a (keyof PreciosFoam)[]
          setColumns(Object.keys(response.data[0]) as (keyof PreciosFoam)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);

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
      console.log("Datos de la fila seleccionada:");
      Object.entries(row).forEach(([key, value]) => {
        console.log(`Columna: ${key}, Valor: ${value}`);
      });

      // Mapea las claves con espacios a nombres válidos
      const transformedRow = {
        ...row,
        ancho_rollo:  row["ancho rollo"], // Mapea "ancho rollo" a "ancho_rollo"
        largo_rollo: row["largo rollo"], // Mapea "largo rollo" a "largo_rollo"
      };

      setIsEditing(true);
      setFormData(transformedRow); // Asigna los valores transformados a formData
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