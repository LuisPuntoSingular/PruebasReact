import { Employee } from "../PayrollTabale";
import { fetchPayroll, getEmployeeSalaryById } from "../payRollHumanResourcesService";

// Lógica para obtener y procesar empleados
export async function getProcessedEmployees(selectedWeek: number, selectedYear: number): Promise<Employee[]> {
  const data = await fetchPayroll(selectedWeek, selectedYear);
  const employeesMap: { [key: number]: Employee } = {};

  for (const rec of data) {
    const empId = rec.employee_id;
    if (!employeesMap[empId]) {
      let salario = rec.salario ?? 0;
      if (!salario) {
        try {
          const salaryData = await getEmployeeSalaryById(empId);
          salario = salaryData.salary;
        } catch {
          salario = 0;
        }
      }
      employeesMap[empId] = {
        id: empId,
        full_name: `${rec.first_name ?? ""} ${rec.last_name_paterno ?? ""}`,
        salario,
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
        total_te: 0,
        importe_te: 0,
        infonavit: "",
        fonacot: "",
        total_percepciones: 0,
        debe: "",
        abono: "",
        restan: 0,
        otros: "",
        bono_normal: "",
        bono_mensual: "",
        tarjeta: "",
        efectivo: 0,
        tota: 0,
      };
    }
    const dayOfWeek = new Date(rec.date).getDay();
    const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    employeesMap[empId][dayMap[dayOfWeek]] = rec.code;

    const overtime = Number(rec.overtime_hours ?? 0);
    employeesMap[empId].total_te += overtime;
  }

  Object.values(employeesMap).forEach((emp) => {
    emp.importe_te = emp.total_te * 50;
    emp.total_percepciones =
      Number(emp.importe_te || 0) +
      Number(emp.salario || 0) +
      Number(emp.infonavit || 0) +
      Number(emp.fonacot || 0);
    emp.restan =
      Number(emp.debe || 0) - Number(emp.abono || 0);

    emp.tarjeta = (
      Number(emp.total_percepciones || 0) -
      Number(emp.abono || 0) +
      Number(emp.bono_normal || 0) +
      Number(emp.bono_mensual || 0)
    ).toString();

    emp.efectivo =
      Number(emp.total_percepciones || 0) -
      (Number(emp.abono || 0) +
        Number(emp.bono_normal || 0) +
        Number(emp.bono_mensual || 0) +
        Number(emp.tarjeta || 0));

    emp.tota = Number(emp.tarjeta || 0) + Number(emp.efectivo || 0);
  });

  return Object.values(employeesMap);
}

// Lógica para actualizar campos y cálculos
export function handleInputChangeLogic(
  employees: Employee[],
  id: number,
  field: string,
  value: string
): Employee[] {
  return employees.map(emp => {
    if (emp.id !== id) return emp;
    const updated = { ...emp, [field]: value };

    // Actualiza restan
    if (field === "debe" || field === "abono") {
      updated.restan =
        Number(updated.debe || 0) - Number(updated.abono || 0);
    }

    // Actualiza total_percepciones
    if (["infonavit", "fonacot", "importe_te", "salario"].includes(field)) {
      updated.total_percepciones =
        Number(updated.importe_te || 0) +
        Number(updated.salario || 0) +
        Number(updated.infonavit || 0) +
        Number(updated.fonacot || 0);
    }

    // Actualiza tarjeta
    if (
      ["total_percepciones", "abono", "bono_normal", "bono_mensual"].includes(field)
    ) {
      updated.tarjeta = (
        Number(updated.total_percepciones || 0) -
        Number(updated.abono || 0) +
        Number(updated.bono_normal || 0) +
        Number(updated.bono_mensual || 0)
      ).toString();
    }

    // Actualiza efectivo
    if (
      ["total_percepciones", "abono", "bono_normal", "bono_mensual", "tarjeta"].includes(field)
    ) {
      updated.efectivo =
        Number(updated.total_percepciones || 0) -
        (Number(updated.abono || 0) +
          Number(updated.bono_normal || 0) +
          Number(updated.bono_mensual || 0) +
          Number(updated.tarjeta || 0));
    }

    // Actualiza total
    if (
      ["tarjeta", "efectivo"].includes(field)
    ) {
      updated.tota = Number(updated.tarjeta || 0) + Number(updated.efectivo || 0);
    }

    return updated;
  });
}

// Lógica para totales
export function getTotals(employees: Employee[]) {
  const totalTarjeta = employees.reduce((acc, emp) => acc + Number(emp.tarjeta || 0), 0);
  const totalEfectivo = employees.reduce((acc, emp) => acc + Number(emp.efectivo || 0), 0);
  const totalGeneral = totalTarjeta + totalEfectivo;
  return { totalTarjeta, totalEfectivo, totalGeneral };
}