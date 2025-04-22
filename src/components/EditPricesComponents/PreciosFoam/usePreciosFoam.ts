import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/preciosfoam";

interface PreciosFoam {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: number;
  idfoam: number;
  ancho_rollo: number;
  largo_rollo: number;
}

export const usePreciosFoam = () => {
  const [columns, setColumns] = useState<(keyof PreciosFoam)[]>([]); // Cambiar `any` a `(keyof PreciosFoam)[]`
  const [data, setData] = useState<PreciosFoam[]>([]); // Cambiar `any[]` a `PreciosFoam[]`
  const [formData, setFormData] = useState<PreciosFoam>({
    medidas: "",
    precio: 0,
    idfoam: 0,
    ancho_rollo: 0,
    largo_rollo: 0,
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
        ancho_rollo: row.ancho_rollo,
        largo_rollo: row.largo_rollo,
      };

      setIsEditing(true);
      setFormData(transformedRow); // Asigna los valores transformados a formData
    } else {
      setIsEditing(false);
      setFormData({
        medidas: "",
        precio: 0,
        idfoam: 0,
        ancho_rollo: 0,
        largo_rollo: 0,
      }); // Resetea el formulario para un nuevo registro
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      medidas: "",
      precio: 0,
      idfoam: 0,
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