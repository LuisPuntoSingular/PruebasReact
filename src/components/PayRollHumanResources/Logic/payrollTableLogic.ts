import { fetchPayroll, getEmployeeSalaryById } from "../Services/payRollHumanResourcesService";
import { EmployeePayroll } from "../Services/PayRollTableService";


// Lógica para obtener y procesar empleados
export async function getProcessedEmployees(
  selectedWeek: number,
  selectedYear: number
): Promise<EmployeePayroll[]> {
  const data = await fetchPayroll(selectedWeek, selectedYear);
  const employeesMap: { [key: number]: EmployeePayroll } = {};

  for (const rec of data) {
    const empId = rec.employee_id;
    if (!employeesMap[empId]) {
      let salary = rec.salary ?? 0;
      if (!salary) {
        try {
          const salaryData = await getEmployeeSalaryById(empId);
          salary = salaryData.salary;
        } catch {
          salary = 0;
        }
      } 

      employeesMap[empId] = {
        employee_id: empId,
        full_name: `${rec.first_name ?? ""} ${rec.last_name_paterno ?? ""}`,
        week_number: selectedWeek,
        year: selectedYear,
        monday_hours: "",
        monday_extra_hours: 0,
        tuesday_hours: "",
        tuesday_extra_hours: 0,
        wednesday_hours: "",
        wednesday_extra_hours: 0,
        thursday_hours: "",
        thursday_extra_hours: 0,
        friday_hours: "",
        friday_extra_hours: 0,
        saturday_hours: "",
        saturday_extra_hours: 0,
        sunday_hours: "",
        sunday_extra_hours: 0,
        total_extra_hours: 0,
        extra_hours_amount: 0,
        salary,
        infonavit: "",
        fonacot: "",
        total_perceptions: 0,
        debt: "",
        payment: 0,
        remaining: 0,
        others: "",
        normal_bonus: "",
        monthly_bonus: "",
        card_payment: "",
        cash_payment: 0,
        total_payment: 0,
      };
    }

    const dayOfWeek = new Date(rec.date).getDay();
    const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // Asignar las horas trabajadas al día correspondiente
    employeesMap[empId][`${dayMap[dayOfWeek]}_hours`] = rec.code ?? "?";

    // Asignar las horas extras al día correspondiente
    const overtime = Number(rec.overtime_hours ?? 0);
    employeesMap[empId][`${dayMap[dayOfWeek]}_extra_hours`] = overtime;

    // Sumar las horas extras al total
    employeesMap[empId].total_extra_hours = (
      Number(employeesMap[empId].total_extra_hours || 0) + overtime
    );
  }

  Object.values(employeesMap).forEach((emp) => {

  
    // Calcular importe de horas extras
    emp.extra_hours_amount = (Number(emp.total_extra_hours || 0) * 50);

    // Calcular restante
    emp.remaining = (Number((emp.debt) || 0) - (Number(emp.payment) || 0));

    // Calcular tarjeta
    emp.card_payment = (
      Number(emp.total_perceptions || 0) -
        Number(emp.payment || 0) +
        Number(emp.normal_bonus || 0) +
        Number(emp.monthly_bonus || 0)
    );

    // Calcular efectivo
    emp.cash_payment = (
      Number(emp.total_perceptions || 0) -
        (Number(emp.payment || 0) +
          Number(emp.normal_bonus || 0) +
          Number(emp.monthly_bonus || 0) +
          Number(emp.card_payment || 0))
    );

    // Calcular total
    emp.total_payment = (Number(emp.card_payment || 0) + Number(emp.cash_payment || 0));
  });

  return Object.values(employeesMap);
}

// Lógica para actualizar campos y cálculos
export function handleInputChangeLogic(
  employees: EmployeePayroll[],
  id: number,
  field: string,
  value: string | number
): EmployeePayroll[] {
  return employees.map((emp) => {
    if (emp.employee_id !== id) return emp;
    const updated = { ...emp, [field]: value };

    // Actualiza remaining
    if (field === "debt" || field === "payment") {
      updated.remaining = ((Number(updated.debt) ) - (Number(updated.payment) ));
    }

    // Actualiza total_perceptions
    if (["infonavit", "fonacot", "extra_hours_amount", "salary"].includes(field)) {
      updated.total_perceptions = (
        Number(updated.extra_hours_amount || 0) +
          Number(updated.salary || 0) -
          Number(updated.infonavit || 0) -
          Number(updated.fonacot || 0)
      );
    }

    // Actualiza card_payment
    if (["total_perceptions", "payment", "normal_bonus", "monthly_bonus"].includes(field)) {
      updated.card_payment = (
        Number(updated.total_perceptions || 0) -
          Number(updated.payment || 0) +
          Number(updated.normal_bonus || 0) +
          Number(updated.monthly_bonus || 0)
      );
    }

    // Actualiza cash_payment
    if (
      ["total_perceptions", "payment", "normal_bonus", "monthly_bonus", "card_payment"].includes(
        field
      )
    ) {
      updated.cash_payment = (
        Number(updated.total_perceptions || 0) -
          (Number(updated.payment || 0) +
            Number(updated.normal_bonus || 0) +
            Number(updated.monthly_bonus || 0) +
            Number(updated.card_payment || 0))
      );
    }

    // Actualiza total_payment
    if (["card_payment", "cash_payment"].includes(field)) {
      updated.total_payment = Number(
        Number(updated.card_payment || 0) + Number(updated.cash_payment || 0)
      );
    }

    return updated;
  });
}

// Lógica para totales
export function getTotals(employees: EmployeePayroll[]) {
  const totalTarjeta = employees.reduce((acc, emp) => acc + Number(emp.card_payment || 0), 0);
  const totalEfectivo = employees.reduce((acc, emp) => acc + Number(emp.cash_payment || 0), 0);
  const totalGeneral = totalTarjeta + totalEfectivo;
  return { totalTarjeta, totalEfectivo, totalGeneral };
}