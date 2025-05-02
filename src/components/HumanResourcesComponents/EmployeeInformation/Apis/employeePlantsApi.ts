import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/plants";

// Crear una instancia de Axios con la URL base
const apiClient = axios.create({
  baseURL: API_URL,
});

// Agregar el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Obtén el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Obtener todas las plantas
export const getAllPlants = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data; // Devuelve la lista de plantas
  } catch (error) {
    console.error("Error retrieving plants:", error);
    throw error;
  }
};

// Obtener una planta por ID
export const getPlantById = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data; // Devuelve la planta correspondiente
  } catch (error) {
    console.error("Error retrieving plant:", error);
    throw error;
  }
};

// Crear una nueva planta
export const createPlant = async (plant_name: string) => {
  try {
    const response = await apiClient.post("/", { plant_name });
    return response.data; // Devuelve la planta creada
  } catch (error) {
    console.error("Error creating plant:", error);
    throw error;
  }
};

// Actualizar una planta por ID
export const updatePlant = async (id: number, plant_name: string) => {
  try {
    const response = await apiClient.put(`/${id}`, { plant_name });
    return response.data; // Devuelve la planta actualizada
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
};

// Eliminar una planta por ID
export const deletePlant = async (id: number) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
};