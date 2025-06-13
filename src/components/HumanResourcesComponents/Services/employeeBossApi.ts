import axios, { AxiosResponse } from "axios";


const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeeBoss`;
// Configuración del cliente API con credenciales
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Incluye las credenciales en las peticiones
});

// Interfacesx
export interface EmployeeSupervisor {
  id: number;
  employee_id: number;
  supervisor_id: number;
  start_date: string;
  end_date: string | null;
  active: boolean;
}

// Obtener todos los registros
export const getAllEmployeeSupervisors = async (): Promise<EmployeeSupervisor[]> => {
  const response: AxiosResponse<EmployeeSupervisor[]> = await apiClient.get("/");
  return response.data;
};

// Obtener un registro por ID
export const getEmployeeSupervisorById = async (id: number): Promise<EmployeeSupervisor> => {
  const response: AxiosResponse<EmployeeSupervisor> = await apiClient.get(`/${id}`);
  return response.data;
};

// Crear un nuevo registro
export const createEmployeeSupervisor = async (
  employeeSupervisor: Omit<EmployeeSupervisor, "id">
): Promise<EmployeeSupervisor> => {
  const response: AxiosResponse<EmployeeSupervisor> = await apiClient.post("/", employeeSupervisor);
  return response.data;
};

// Actualizar un registro por ID
export const updateEmployeeSupervisor = async (
  id: number,
  employeeSupervisor: Omit<EmployeeSupervisor, "id">
): Promise<EmployeeSupervisor> => {
  const response: AxiosResponse<EmployeeSupervisor> = await apiClient.put(`/${id}`, employeeSupervisor);
  return response.data;
};

// Eliminar un registro por ID
export const deleteEmployeeSupervisor = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};