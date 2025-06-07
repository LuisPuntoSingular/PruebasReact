import axios, { AxiosResponse } from "axios";

interface PayrollRecord {
  employee_id: number;
  first_name: string;
  salario: number;
  last_name_paterno: string;
  last_name_materno?: string;
  week_id: number;
  date: string;
  code: string;
  overtime_hours: number;
  salary: number;

}
 

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

// Configurar el cliente Axios con un interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchPayroll = async (week: number, year: number): Promise<PayrollRecord[]> => {
  const response: AxiosResponse<PayrollRecord[]> = await apiClient.get("/api/attendance/by-week", {
    params: { week, year },
  });
  return response.data;
};



// Only return the employe's salary by employee ID
export const getEmployeeSalaryById = async (id: number): Promise<{ salary: number }> => {
    const response: AxiosResponse<{ salary: number }> = await axios.get(`${API_URL}/api/employee/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };