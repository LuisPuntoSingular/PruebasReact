
import ExcelJS from "exceljs";

import { buildAttendanceRecords, sendAttendanceRecords } from "../Services/attendanceService";


// Define la interfaz EmployeeRow
export interface EmployeeRow {
  id: number;
  plant_id: number; // Agregado para filtrar por planta
  full_name: string;
  monday: { day: string; extraTime: number };
  tuesday: { day: string; extraTime: number };
  wednesday: { day: string; extraTime: number };
  thursday: { day: string; extraTime: number };
  friday: { day: string; extraTime: number };
  saturday: { day: string; extraTime: number };
  sunday: { day: string; extraTime: number };
  totalExtraTime: number;
}

export interface ExcelRow {
  ID: number ;
  Fecha: string;
  Entrada?: string | null;
  Salida?: string | null;
  Horas?: number;
  HorasExtras?: number;
  Codigo?: string; // Cambiado de "Code" a "Codigo"
}

// Actualiza los empleados con los datos del Excel
export function updateEmployeesFromExcel(
  localEmployees: EmployeeRow[],
  excelData: ExcelRow[],
  startDate: Date,
 
) {
  const dias = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const updatedEmployees = localEmployees.map((emp) => {
  const registrosEmpleado = excelData.filter((row) => Number(row.ID) === Number(emp.id));
    const empActualizado = { ...emp };

    registrosEmpleado.forEach((reg) => {
      const fechaRegistro = reg.Fecha?.slice(0, 10);
      for (let i = 0; i < 7; i++) {
        const fechaDia = new Date(startDate);
        fechaDia.setDate(startDate.getDate() + i);
        const fechaDiaStr = fechaDia.toISOString().slice(0, 10);

        if (fechaDiaStr === fechaRegistro) {
          const dia = dias[i];
          empActualizado[dia] = {
            ...empActualizado[dia], // Preserva los valores manuales existentes
            day: reg.Codigo || empActualizado[dia]?.day || "", // Usa el valor del Excel o el valor manual
            extraTime: reg.HorasExtras ?? empActualizado[dia]?.extraTime ?? 0, // Usa el valor del Excel o el valor manual
          };
        }
      }
    });

    empActualizado.totalExtraTime = dias
      .map((d) => (empActualizado[d] as { day: string; extraTime: number }).extraTime)
      .reduce((sum, extraTime) => sum + extraTime, 0);

    return empActualizado;
  });

  
  return updatedEmployees;
}

// Maneja el cambio de horas extra o código
export function handleExtraTimeChange(
  prev: EmployeeRow[],
  id: number,
  day: string,
  value: number | string
) {
  const updated = prev.map((employee) => {
    if (employee.id === id) {
      const updatedDay = {
        ...(employee[day as keyof EmployeeRow] as { day: string; extraTime: number }),
        ...(typeof value === "number" ? { extraTime: value } : { day: value }),
      };
      const updatedEmployee = {
        ...employee,
        [day]: updatedDay,
      };
      updatedEmployee.totalExtraTime = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        .map((d) => (updatedEmployee[d as keyof EmployeeRow] as { day: string; extraTime: number }).extraTime)
        .reduce((sum, extraTime) => sum + extraTime, 0);
      return updatedEmployee;
    }
    return employee;
  });
  return updated;
}


export const dayTranslations: { [key: string]: string } = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export const getDayDate = (startDate: Date, dayIndex: number) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + dayIndex);
  return date.toLocaleDateString();
};

export function hasQuestionMarkOrEmpty(localEmployees: EmployeeRow[]): boolean {
  return localEmployees.some(emp =>
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      .some(day => {
        const code = (emp[day as keyof EmployeeRow] as { day: string }).day;
        return code === "?" || code === "";
      })
  );
}




// ...ya tienes las otras funciones aquí...

export const exportToExcel = async (employees: EmployeeRow[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Asistencias");

  const headers = [
    "Nombre Completo",
    "Lunes Código", "Lunes Horas",
    "Martes Código", "Martes Horas",
    "Miércoles Código", "Miércoles Horas",
    "Jueves Código", "Jueves Horas",
    "Viernes Código", "Viernes Horas",
    "Sábado Código", "Sábado Horas",
    "Domingo Código", "Domingo Horas",
    "Horas Extra Totales"
  ];
  worksheet.addRow(headers);

  employees.forEach(emp => {
    worksheet.addRow([
      emp.full_name,
      emp.monday.day, emp.monday.extraTime,
      emp.tuesday.day, emp.tuesday.extraTime,
      emp.wednesday.day, emp.wednesday.extraTime,
      emp.thursday.day, emp.thursday.extraTime,
      emp.friday.day, emp.friday.extraTime,
      emp.saturday.day, emp.saturday.extraTime,
      emp.sunday.day, emp.sunday.extraTime,
      emp.totalExtraTime
    ]);
  });

  worksheet.columns.forEach(column => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, cell => {
      maxLength = Math.max(maxLength, (cell.value ? cell.value.toString().length : 0));
    });
    column.width = maxLength + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "asistencias.xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const handleSubmitLogic = async (
  employees: EmployeeRow[],
  startDate: Date,
  selectedWeek: number
) => {
  try {
    const recordsToSend = buildAttendanceRecords(employees, startDate, selectedWeek)
      .filter(record => (record.code && record.code !== "") || record.overtime_hours > 0);

    await sendAttendanceRecords(recordsToSend);
    alert("Asistencias guardadas correctamente");
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar las asistencias");
  }
};