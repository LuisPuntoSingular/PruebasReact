import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plants`;

// Crear una instancia de Axios con la URL base
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});



// Obtener todas las plantas
export const getAllPlants = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data; // Devuelve la lista de plantas
  } catch (error) {
    console.error("Error al obtener las plantas:", error);
    throw error;
  }
};

// Obtener una planta por ID
export const getPlantById = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data; // Devuelve la planta correspondiente
  } catch (error) {
    console.error(`Error al obtener la planta con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva planta
export const createPlant = async (plant_name: string) => {
  try {
    const response = await apiClient.post("/", { plant_name });
    return response.data; // Devuelve la planta creada
  } catch (error) {
    console.error("Error al crear la planta:", error);
    throw error;
  }
};

// Actualizar una planta por ID
export const updatePlant = async (id: number, plant_name: string) => {
  try {
    const response = await apiClient.put(`/${id}`, { plant_name });
    return response.data; // Devuelve la planta actualizada
  } catch (error) {
    console.error(`Error al actualizar la planta con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una planta por ID
export const deletePlant = async (id: number) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    console.error(`Error al eliminar la planta con ID ${id}:`, error);
    throw error;
  }
};