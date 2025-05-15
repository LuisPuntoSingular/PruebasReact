import axios, { AxiosResponse } from "axios";
// Usar la variable de entorno para configurar la URL base

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
// Definir la interfaz para un empleado

export interface AttendanceCode {
  id: number; // ID del código de asistencia
  code: string; // Código de asistencia
  description: string; // Descripción del código
}

export interface Employee {
    id?: number; // Opcional porque no estará presente al crear un nuevo empleado
    plant_id?: number; // Opcional porque no estará presente al crear un nuevo empleado
    first_name: string;
    second_name: string;
    last_name_paterno: string;
    last_name_materno: string;
    work_area_id: number;
    salary: number;
    hire_date: string;
    phone_number?: string; // Opcional
    emergency_contact?: string; // Opcional
    nss_date?: string | null; // Opcional, puede ser null
    status: boolean;
    
  }

  
// Configurar el cliente Axios con un interceptor
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

export const getEmployeesByWorkAreaAndPlant = async (plantId: number, workAreaId: number): Promise<Employee[]> => {
    try {
      const response: AxiosResponse<Employee[]> = await apiClient.get("/api/employee/by-work-area-and-plant", {
        params: { plantId, workAreaId }, // Pasa los parámetros como query params
      });
      return response.data; // Devuelve los empleados
    } catch (error) {
      console.error("Error al obtener empleados por área de trabajo y planta:", error);
      throw error;
    }
  };

  export const getAttendanceCodes = async (): Promise<AttendanceCode[]> => {
    try {
      const response: AxiosResponse<AttendanceCode[]> = await apiClient.get("/api/attendance-codes");
      return response.data; // Devuelve los códigos de asistencia
    } catch (error) {
      console.error("Error al obtener los códigos de asistencia:", error);
      throw error;
    }
  };