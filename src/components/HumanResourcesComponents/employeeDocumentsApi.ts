import axios, { AxiosResponse } from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeeDocuments`;

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

// Interfaz para los documentos de un empleado
export interface EmployeeDocuments {
  birth_certificate: boolean;
  curp: boolean;
  proof_of_address: boolean;
  ine: boolean;
  rfc: boolean;
  nss: boolean; // Propiedad NSS
  fonacot: boolean; // Nuevo campo
  infonavit: boolean; // Nuevo campo
}

// Obtener los documentos de un empleado por ID
export const getEmployeeDocuments = async (id: number): Promise<EmployeeDocuments> => {
  try {
    const response: AxiosResponse<EmployeeDocuments> = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los documentos del empleado:", error);
    throw error;
  }
};

// Actualizar los documentos de un empleado por ID
export const updateEmployeeDocuments = async (
  id: number,
  documents: EmployeeDocuments
): Promise<EmployeeDocuments> => {
  try {
    const response: AxiosResponse<EmployeeDocuments> = await apiClient.put(`/${id}`, documents);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar los documentos del empleado:", error);
    throw error;
  }
};