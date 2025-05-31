import axios from "axios";

export interface EmployeePayroll {
  employee_id: number;
  full_name: string;
  week_number: number;
  year: number;
  monday_hours: string;
  monday_extra_hours: number;
  tuesday_hours: string;
  tuesday_extra_hours: number;
  wednesday_hours: string;
  wednesday_extra_hours: number ;
  thursday_hours: string;
  thursday_extra_hours: number;
  friday_hours: string;
  friday_extra_hours: number;
  saturday_hours: string;
  saturday_extra_hours: number;
  sunday_hours: string;
  sunday_extra_hours: number;
  total_extra_hours: number;
  extra_hours_amount: number;
  salary: number;
  infonavit: number | string; // Puede ser un número o una cadena
  fonacot: number | string; // Puede ser un número o una cadena
  total_perceptions: number | string ; // Puede ser un número o una cadena
  debt: number  | string; // Puede ser un número o una cadena
  payment: number   | string; // Puede ser un número o una cadena
  remaining: number  | string ; // Puede ser un número o una cadena
  others: number  | string; // Puede ser un número o una cadena
  normal_bonus: number | string; // Puede ser un número o una cadena
  monthly_bonus: number | string; // Puede ser un número o una cadena
  card_payment: number | string; // Puede ser un número o una cadena
  cash_payment: number;
  total_payment: number;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeePayRoll`;

// Configuración global de Axios para incluir credenciales (cookies)
axios.defaults.withCredentials = true;

// Función para guardar o actualizar la nómina
export async function saveOrUpdatePayroll(employeePayroll: EmployeePayroll) {
  try {
    // Primero intentamos actualizar (PUT)
    const response = await axios.put(`${API_BASE_URL}/by-employee-week-year`, employeePayroll);

    console.log("Nómina actualizada:", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Si no se encuentra el registro, creamos uno nuevo (POST)
      try {
        const response = await axios.post(`${API_BASE_URL}/`, employeePayroll);
        console.log("Nómina creada:", response.data);
        return response.data;
      } catch (postError) {
        console.error("Error al crear la nómina:", postError);
        throw postError;
      }
    } else {
      console.error("Error al actualizar la nómina:", error);
      throw error;
    }
  }
}


// Función para obtener campos específicos de la nómina por employee_id, week_number y year
export async function getPayrollByEmployeeWeekYear(
  employee_id: number,
  week_number: number,
  year: number
): Promise<{
  infonavit: number;
  fonacot: number;
  total_perceptions: number | string;
  debt: number;
  payment: number;
  remaining: number;
  others: number;
  normal_bonus: number;
  monthly_bonus: number;
  card_payment: number;
  cash_payment: number;
  total_payment: number;
}> {
  try {
    const response = await axios.get(`${API_BASE_URL}/by-employee-week-year`, {
      params: { employee_id, week_number, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la nómina:", error);
    if (error.response && error.response.status === 404) {
      throw new Error("Nómina no encontrada para los parámetros especificados");
    }
    throw new Error("Error al obtener la nómina");
  }
}