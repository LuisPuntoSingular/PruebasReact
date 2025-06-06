import { format } from "date-fns";
import axios from "axios";

// Definir la interfaz para un empleado
export interface EmployeeAssist {
  id?: number;
  plant_id: number;
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  status: boolean;
}

export interface EmployeeRow {
  id: number;
  monday: { day: string; extraTime: number };
  tuesday: { day: string; extraTime: number };
  wednesday: { day: string; extraTime: number };
  thursday: { day: string; extraTime: number };
  friday: { day: string; extraTime: number };
  saturday: { day: string; extraTime: number };
  sunday: { day: string; extraTime: number };
}

export interface AttendanceRecord {
  employee_id: number;
  date: string;
  code: string;
  week_id: number;
  overtime_hours: number;
  is_sunday: boolean;
  is_holiday: boolean;
  remarks: string | null;
}

export const buildAttendanceRecords = (
  employees: EmployeeRow[],
  startDate: Date,
  selectedWeek: number
): AttendanceRecord[] => {
  const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return employees.flatMap((emp) =>
    weekDays.map((day, index) => {
      const dayData = emp[day as keyof EmployeeRow] as { day: string; extraTime: number };
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      return {
        employee_id: emp.id,
        date: format(date, "yyyy-MM-dd"),
        code: dayData.day,
        week_id: selectedWeek,
        overtime_hours: dayData.extraTime || 0,
        is_sunday: day === "sunday",
        is_holiday: false,
        remarks: null,
      };
    })
  );
};

export const sendAttendanceRecords = async (records: AttendanceRecord[]) => {
  for (const record of records) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attendance`,
        record,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      let errorMsg = "Error en el registro de asistencia";
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: { data?: { message?: string } } }).response?.data &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
      ) {
        errorMsg = (error as { response: { data: { message: string } } }).response.data.message;
      }
      throw new Error(errorMsg);
    }
  }
};

export interface UploadAttendanceExcelResponse {
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}

export const uploadAttendanceExcel = async (
  file: File,
  fecha_inicio: string,
  fecha_final: string
): Promise<UploadAttendanceExcelResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fecha_inicio", fecha_inicio);
  formData.append("fecha_final", fecha_final);

  try {
    const response = await axios.post(
      "https://microserviceexcell-production.up.railway.app/procesar-excel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    let errorMsg = "Error al procesar el archivo";
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object" &&
      (error as { response?: { data?: { error?: string } } }).response?.data &&
      typeof (error as { response?: { data?: { error?: string } } }).response?.data?.error === "string"
    ) {
      errorMsg = (error as { response: { data: { error: string } } }).response.data.error;
    }
    throw new Error(errorMsg);
  }
};

export const getEmployeesAssist = async (): Promise<EmployeeAssist[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attendance/getEmployeesAssist`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let errorMsg = "Error al obtener los empleados";
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object" &&
      (error as { response?: { data?: { error?: string } } }).response?.data &&
      typeof (error as { response?: { data?: { error?: string } } }).response?.data?.error === "string"
    ) {
      errorMsg = (error as { response: { data: { error: string } } }).response.data.error;
    }
    throw new Error(errorMsg);
  }
};