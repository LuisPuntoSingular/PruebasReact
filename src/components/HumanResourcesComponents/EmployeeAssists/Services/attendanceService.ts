import { format } from "date-fns";

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
      const res = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
  
      if (!res.ok) {
        // Intenta extraer el mensaje de error del backend
        let errorMsg = "Error en el registro de asistencia";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch {
          // Si no es JSON, deja el mensaje por defecto
        }
        throw new Error(errorMsg);
      }
    }
  };



export interface UploadAttendanceExcelResponse {
  // Ajusta estos campos según la respuesta real de tu backend
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

  const response = await fetch("http://127.0.0.1:8000/procesar-excel", {
    method: "POST",
    body: formData,
  });

  const data: UploadAttendanceExcelResponse = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al procesar el archivo");
  }
  return data;
};