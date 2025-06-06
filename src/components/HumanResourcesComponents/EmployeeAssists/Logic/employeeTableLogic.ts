import { EmployeeRow } from "../EmployeeTableAssist";

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