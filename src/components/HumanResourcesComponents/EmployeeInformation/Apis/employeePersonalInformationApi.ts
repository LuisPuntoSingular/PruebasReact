import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeePersonalInformation`;

// Configurar el cliente Axios
const apiClient = axios.create({
  baseURL: API_URL,
});

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

// Definir la interfaz para la información personal
export interface PersonalInfo {
  employee_id: number;
  curp?: string | null;
  rfc?: string | null;
  gender: string;
  marital_status: string;
  birth_date: string;
  nss?: string | null;
}

// Obtener información personal por ID
export const getEmployeePersonalInformationById = async (id: number): Promise<PersonalInfo> => {
  try {
    const response = await apiClient.get<PersonalInfo>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la información personal con ID ${id}:`, error);
    throw new Error("No se pudo obtener la información personal.");
  }
};

// Crear nueva información personal
export const createEmployeePersonalInformation = async (
  personalInfo: PersonalInfo
): Promise<PersonalInfo> => {
  try {
    const response = await apiClient.post<PersonalInfo>("/", personalInfo);
    return response.data;
  } catch (error) {
    console.error("Error al crear la información personal:", error);
    throw new Error("No se pudo crear la información personal.");
  }
};

// Actualizar información personal por ID
export const updateEmployeePersonalInformation = async (
  id: number,
  personalInfo: PersonalInfo
): Promise<PersonalInfo> => {
  try {
    const response = await apiClient.put<PersonalInfo>(`/${id}`, personalInfo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la información personal con ID ${id}:`, error);
    throw new Error("No se pudo actualizar la información personal.");
  }
};

// Eliminar información personal por ID
export const deleteEmployeePersonalInformation = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la información personal con ID ${id}:`, error);
    throw new Error("No se pudo eliminar la información personal.");
  }
};