import axios from "axios";

// Configurar la base URL desde las variables de entorno
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeePayRollStatus`;

// Configurar Axios para incluir cookies automáticamente
axios.defaults.withCredentials = true;

export const getPayrollLockStatus = async (week_number: number, year: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payroll/lock`, {
      params: { week_number, year },
    });
    return response.data.is_locked || false;
  } catch (error) {
    console.error('Error al consultar el estado de bloqueo:', error);
    // Devolver un valor predeterminado si ocurre un error
    return false;
  }
};

export const updatePayrollLockStatus = async (week_number: number, year: number, is_locked: boolean): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/payroll/lock`,
      { week_number, year, is_locked },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error al actualizar el estado de bloqueo:', error);
    throw error;
  }
};