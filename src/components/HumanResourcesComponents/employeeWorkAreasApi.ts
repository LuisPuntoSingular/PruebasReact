import axios, { AxiosResponse } from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/work-areas"; // Ruta base para las áreas de trabajo

// Definir la interfaz para un área de trabajo
export interface WorkArea {
  id: number;
  work_area_name: string;
  parent_id?: number | null; // Opcional porque puede ser null
}

// Configurar el cliente Axios con un interceptor
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

// Obtener todas las áreas de trabajo
export const getAllWorkAreas = async (): Promise<WorkArea[]> => {
  try {
    const response: AxiosResponse<WorkArea[]> = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las áreas de trabajo:", error);
    throw new Error("No se pudieron obtener las áreas de trabajo.");
  }
};

// Obtener un área de trabajo por ID
export const getWorkAreaById = async (id: number): Promise<WorkArea> => {
  try {
    const response: AxiosResponse<WorkArea> = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el área de trabajo con ID ${id}:`, error);
    throw new Error("No se pudo obtener el área de trabajo.");
  }
};

// Crear una nueva área de trabajo
export const createWorkArea = async (workArea: {
  work_area_name: string;
  parent_id?: number | null;
}): Promise<WorkArea> => {
  try {
    const response: AxiosResponse<WorkArea> = await apiClient.post("/", workArea);
    return response.data;
  } catch (error) {
    console.error("Error al crear el área de trabajo:", error);
    throw new Error("No se pudo crear el área de trabajo.");
  }
};

// Actualizar un área de trabajo
export const updateWorkArea = async (
  id: number,
  workArea: {
    work_area_name: string;
    parent_id?: number | null;
  }
): Promise<WorkArea> => {
  try {
    const response: AxiosResponse<WorkArea> = await apiClient.put(`/${id}`, workArea);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el área de trabajo con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el área de trabajo.");
  }
};

// Eliminar un área de trabajo
export const deleteWorkArea = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el área de trabajo con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el área de trabajo.");
  }
};