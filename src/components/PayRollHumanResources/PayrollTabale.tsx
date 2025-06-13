import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Button, ButtonGroup,
  InputAdornment
} from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { getProcessedEmployees, handleInputChangeLogic, getTotals } from "./Logic/payrollTableLogic";
import { saveOrUpdatePayroll, getPayrollByEmployeeWeekYear, EmployeePayroll } from "./Services/PayRollTableService";
import { getPayrollLockStatus, updatePayrollLockStatus } from "./Services/PayrollLockService";

import { getEmployeePlantId } from "../HumanResourcesComponents/Services/employeeApi"; // Ajusta la ruta


interface Props {
  selectedWeek: number;
  selectedYear: number;
}




const PayrollTable: React.FC<Props> = ({ selectedWeek, selectedYear }) => {
  const [employees, setEmployees] = useState<EmployeePayroll[]>([]);
const [employeePlants, setEmployeePlants] = useState<{ [id: number]: number }>({});

const [filter, setFilter] = useState<string>("Todos"); // Estado para el filtro seleccionado
const [isLocked, setIsLocked] = useState(false);

// Efecto para obtener los empleados de la nómina por Carton,Madera y Todos
const filteredEmployees = employees.filter(emp => {
  if (filter === "Todos") return true;
  const plantId = employeePlants[emp.employee_id];
  if (filter === "Madera") return plantId === 1;
  if (filter === "Cartón") return plantId === 2;
  return true;
});

// Efecto para obtener los empleados de la nómina y sus plantas
useEffect(() => {
  const fetchEmployeePlants = async () => {
    // Obtén todos los IDs de empleados de la nómina actual
    const ids = employees.map(emp => emp.employee_id);
    const map: { [id: number]: number } = {};

    // Para cada empleado, pide su plant_id
    await Promise.all(
      ids.map(async (id) => {
        try {
          const { plant_id } = await getEmployeePlantId(id);
          map[id] = plant_id;
        } catch (error) {
          map[id] = 0; // O el valor que prefieras si falla
          console.error(`Error obteniendo plant_id para empleado ${id}:`, error);
        }
      })
    );
    setEmployeePlants(map);
  };

  if (employees.length > 0) {
    fetchEmployeePlants();
  }
}, [employees]);



const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Nómina");

  // Encabezados
  worksheet.columns = [
    { header: "ID", key: "employee_id", width: 10 },
    { header: "Nombre", key: "full_name", width: 25 },
    { header: "Lun", key: "monday_hours", width: 10 },
    { header: "T.E. Lun", key: "monday_extra_hours", width: 12 },
    { header: "Mar", key: "tuesday_hours", width: 10 },
    { header: "T.E. Mar", key: "tuesday_extra_hours", width: 12 },
    { header: "Mie", key: "wednesday_hours", width: 10 },
    { header: "T.E. Mie", key: "wednesday_extra_hours", width: 12 },
    { header: "Jue", key: "thursday_hours", width: 10 },
    { header: "T.E. Jue", key: "thursday_extra_hours", width: 12 },
    { header: "Vie", key: "friday_hours", width: 10 },
    { header: "T.E. Vie", key: "friday_extra_hours", width: 12 },
    { header: "Sab", key: "saturday_hours", width: 10 },
    { header: "T.E. Sab", key: "saturday_extra_hours", width: 12 },
    { header: "Dom", key: "sunday_hours", width: 10 },
    { header: "T.E. Dom", key: "sunday_extra_hours", width: 12 },
    { header: "Total T.E.", key: "total_extra_hours", width: 12 },
    { header: "Importe de T.E.", key: "extra_hours_amount", width: 15 },
    { header: "Sueldo", key: "salary", width: 12 },
    { header: "INFONAVIT", key: "infonavit", width: 12 },
    { header: "FONACOT", key: "fonacot", width: 12 },
    { header: "TOTAL PERCEPCIONES", key: "total_perceptions", width: 18 },
    { header: "Debe", key: "debt", width: 12 },
    { header: "Abono", key: "payment", width: 12 },
    { header: "Restan", key: "remaining", width: 12 },
    { header: "OTROS", key: "others", width: 12 },
    { header: "Bono normal", key: "normal_bonus", width: 14 },
    { header: "Bono mensual", key: "monthly_bonus", width: 14 },
    { header: "TARJETA", key: "card_payment", width: 12 },
    { header: "EFECTIVO", key: "cash_payment", width: 12 },
    { header: "TOTAL", key: "total_payment", width: 12 },
  ];

  // Agrega los datos
  filteredEmployees.forEach(emp => {
    worksheet.addRow(emp);
  });

  // Estilo de encabezados
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { horizontal: "center" };

  // Genera el archivo y lo descarga
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `nomina-semana-${selectedWeek}-${selectedYear}.xlsx`);
};



// Function to handle saving changes to the payroll
const handleSaveChanges = async () => {
  try {
    for (const employee of employees) {
      const employeePayroll = {
  employee_id: employee.employee_id || 0,
  full_name: employee.full_name,
  week_number: selectedWeek,
  year: selectedYear,
  monday_hours: employee.monday_hours || "",
  monday_extra_hours: employee.monday_extra_hours || 0,
  tuesday_hours: employee.tuesday_hours || "",
  tuesday_extra_hours: employee.tuesday_extra_hours || 0,
  wednesday_hours: employee.wednesday_hours || "",
  wednesday_extra_hours: employee.wednesday_extra_hours || 0,
  thursday_hours: employee.thursday_hours || "",
  thursday_extra_hours: employee.thursday_extra_hours || 0,
  friday_hours: employee.friday_hours || "",
  friday_extra_hours: employee.friday_extra_hours || 0,
  saturday_hours: employee.saturday_hours || "",
  saturday_extra_hours: employee.saturday_extra_hours || 0,
  sunday_hours: employee.sunday_hours || "",
  sunday_extra_hours: employee.sunday_extra_hours || 0,
  total_extra_hours: Number(employee.total_extra_hours) || 0,
  extra_hours_amount: Number(employee.extra_hours_amount) || 0,
  salary: Number(employee.salary) || 0,
  infonavit: Number(employee.infonavit),
  fonacot: Number(employee.fonacot),
  // Asegúrate de que estos campos sean números o cadenas vacías
  total_perceptions: Number(employee.total_perceptions) || "",
  debt: Number(employee.debt) || 0,
  payment: Number(employee.payment) || 0,
  remaining: Number(employee.remaining) || 0,
  others: Number(employee.others) || 0,
  normal_bonus: Number(employee.normal_bonus) || 0,
  monthly_bonus: Number(employee.monthly_bonus) || 0,
  card_payment: Number(employee.card_payment) || 0,
  cash_payment: Number(employee.cash_payment) || 0,
  total_payment: Number(employee.total_payment) || 0,
};

      // Llama a la función para guardar o actualizar la nómina
      await saveOrUpdatePayroll(employeePayroll);
    }
    alert("Cambios guardados exitosamente.");
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    alert("Ocurrió un error al guardar los cambios. Por favor, revisa los datos.");
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const processed = await getProcessedEmployees(selectedWeek, selectedYear);

      // Iterar sobre los empleados y obtener datos adicionales de la nómina
     const updatedEmployees = await Promise.all(
  processed.map(async (employee) => {
    try {
      const payrollData = await getPayrollByEmployeeWeekYear(
        employee.employee_id,
        selectedWeek,
        selectedYear
      );
      return {
        ...employee,
        infonavit: payrollData.infonavit ,
        fonacot: payrollData.fonacot,
        total_perceptions: payrollData.total_perceptions,
        debt: payrollData.debt ,
        payment: payrollData.payment,
        remaining: payrollData.remaining,
        others: payrollData.others ,
        normal_bonus: payrollData.normal_bonus,
        monthly_bonus: payrollData.monthly_bonus,
        card_payment: payrollData.card_payment ,
        cash_payment: payrollData.cash_payment ,
        total_payment: payrollData.total_payment,
      };
    } catch (error) {
      console.warn(`No se encontró nómina para el empleado ${employee.employee_id}:`, error);
      return {
        ...employee,
        infonavit: "",
        fonacot: "",
        total_perceptions: 0,
        debt: 0,
        payment: 0,
        remaining: 0,
        others: 0,
        normal_bonus: 0,
        monthly_bonus: 0,
        card_payment: 0,
        cash_payment: 0,
        total_payment: 0,
      };
    }
  })
);

// Filtra cualquier valor undefined o nulo
setEmployees(updatedEmployees.filter(emp => emp && typeof emp.employee_id !== "undefined"));

      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error al obtener los datos de los empleados:", error);
      setEmployees([]);
    }
  };

  fetchData();
}, [selectedWeek, selectedYear]);




const handleInputChange = (id: number, field: string, value: string | number) => {
  const sanitizedValue = value === "" ? "" : value; // Permitir valores vacíos
  setEmployees((prev) =>
    handleInputChangeLogic(prev, id, field, sanitizedValue)
  );
};


  
  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
    console.log(`Filtro seleccionado: ${filterType}`);
  };

  const handleLockPayroll = async () => {
  const confirmLock = window.confirm('¿Estás seguro de que deseas bloquear la nómina?');
  if (!confirmLock) return;

  try {
    await updatePayrollLockStatus(selectedWeek, selectedYear, true); // Bloquear la nómina en el backend
    setIsLocked(true); // Actualizar el estado local
    alert('La nómina ha sido bloqueada exitosamente.');
  } catch (error) {
    console.error('Error al bloquear la nómina:', error);
    alert('Ocurrió un error al bloquear la nómina.');
  }
};
useEffect(() => {
  const fetchLockStatus = async () => {
    try {
      const isLocked = await getPayrollLockStatus(selectedWeek, selectedYear); // Consultar el estado de bloqueo
      setIsLocked(isLocked); // Actualizar el estado local
    } catch (error) {
      console.error('Error al consultar el estado de bloqueo:', error);
    }
  };

  fetchLockStatus();
}, [selectedWeek, selectedYear]);



  const { totalTarjeta, totalEfectivo, totalGeneral } = getTotals(employees);



  return (
    <React.Fragment>
       
       {/* The little table where you can see the total amount of , tarjet, total,  */}
      <Box display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{ p: 2 }}>
        <table style={{ borderCollapse: "collapse", minWidth: 220, fontSize: 16 }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>TARJETA</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>
                {totalTarjeta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>EFECTIVO</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>
                {totalEfectivo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>TOTAL</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right", fontWeight: 700 }}>
                {totalGeneral.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

         {/* Botones de filtro, Nómina Pagada y Guardar Cambios */}
<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
  <ButtonGroup variant="contained" color="primary">
    <Button onClick={() => handleFilterChange("Todos")}>Todos</Button>
    <Button onClick={() => handleFilterChange("Madera")}>Madera</Button>
    <Button onClick={() => handleFilterChange("Cartón")}>Cartón</Button>
  </ButtonGroup>
  <Box sx={{ display: "flex", gap: 2 }}>

    <Button
  variant="contained"
  color="success"
  onClick={handleLockPayroll}
  disabled={isLocked} // Deshabilitar el botón si la nómina ya está bloqueada
>
  Nómina Pagada
</Button>

    <Button variant="contained" color="secondary" onClick={handleSaveChanges}  disabled={isLocked}>
      Guardar Cambios
    </Button>

  </Box>
</Box>

      <TableContainer component={Paper} elevation={3} sx={{ overflowX: "auto" }}>
        <div style={{ padding: 16 }}>
          <Button
  variant="contained"
  color="primary"
  onClick={exportToExcel}
  style={{ marginBottom: 16 }}
>
  Exportar a Excel
</Button>
        </div>
        <Table
          size="small"
          sx={{
            minWidth: 1800,
            border: 1,
            borderColor: "#ccc",
            '& td, & th': { border: 1, borderColor: "#ccc" }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ background: "#b3d1ee" }}>ID</TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  background: "#b3d1ee",
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  border: 1,
                  borderColor: "#ccc",
                  backgroundClip: "padding-box"
                }}
              >
                Nombre
              </TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Lun</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Mar</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Mie</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Jue</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Vie</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Sab</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Dom</TableCell>
              <TableCell sx={{ background: "#e3f2fd" }}>T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Total T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Importe de T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Sueldo</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Infonavit</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Fonacot</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Total Percepciones</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Debe</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Abono</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Restan</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Otros</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Bono normal</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Bono mensual</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Tarjeta</TableCell>
              <TableCell sx={{ background: "#ff4444", color: "#fff", fontWeight: 700 }}>EFECTIVO</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>TOTAL</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
  {filteredEmployees.map((emp, index) => (
    <TableRow key={emp.employee_id} sx={{ background: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
      <TableCell>{emp.employee_id}</TableCell>
      <TableCell
        sx={{
          position: "sticky",
          left: 0,
          zIndex: 2,
          background: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Fondo para que coincida con las filas
          fontWeight: 700,
        }}
      >
        {emp.full_name}
      </TableCell>
      <TableCell>{emp.monday_hours}</TableCell>
<TableCell>{emp.monday_extra_hours}</TableCell>
<TableCell>{emp.tuesday_hours}</TableCell>
<TableCell>{emp.tuesday_extra_hours}</TableCell>
<TableCell>{emp.wednesday_hours}</TableCell>
<TableCell>{emp.wednesday_extra_hours}</TableCell>
<TableCell>{emp.thursday_hours}</TableCell>
<TableCell>{emp.thursday_extra_hours}</TableCell>
<TableCell>{emp.friday_hours}</TableCell>
<TableCell>{emp.friday_extra_hours}</TableCell>
<TableCell>{emp.saturday_hours}</TableCell>
<TableCell>{emp.saturday_extra_hours}</TableCell>
<TableCell>{emp.sunday_hours}</TableCell>
<TableCell>{emp.sunday_extra_hours}</TableCell>
<TableCell>{emp.total_extra_hours}</TableCell>
<TableCell>${emp.extra_hours_amount}</TableCell>
<TableCell>${emp.salary}</TableCell>
      <TableCell>
        <TextField
    value={emp.infonavit !== undefined && emp.infonavit !== null ? emp.infonavit : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "infonavit", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "infonavit", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 60 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />
      </TableCell>
      <TableCell>

    <TextField
    value={emp.fonacot !== undefined && emp.fonacot !== null ? emp.fonacot : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "fonacot", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "fonacot", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 60 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />

      </TableCell>
      <TableCell>${emp.total_perceptions}</TableCell>
      <TableCell>
        <TextField
    value={emp.debt !== undefined && emp.debt !== null ? emp.debt : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "debt", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "debt", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />
      </TableCell>
      <TableCell>

        <TextField
    value={emp.payment !== undefined && emp.payment !== null ? emp.payment : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "payment", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "payment", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />

      </TableCell>
      <TableCell>{emp.remaining}</TableCell>
      <TableCell>
        <TextField
    value={emp.others !== undefined && emp.others !== null ? emp.others : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "others", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "others", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />
      </TableCell>
      <TableCell>
        <TextField
    value={emp.normal_bonus !== undefined && emp.normal_bonus !== null ? emp.normal_bonus : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "normal_bonus", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "normal_bonus", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />
      </TableCell>
      <TableCell>
       <TextField
    value={emp.monthly_bonus !== undefined && emp.monthly_bonus !== null ? emp.monthly_bonus : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "monthly_bonus", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "monthly_bonus", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
     InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  />
      </TableCell>
      
      <TableCell>
        <TextField
    value={emp.card_payment !== undefined && emp.card_payment !== null ? emp.card_payment : 0} // Mostrar el valor actual o 0
    onChange={(e) => handleInputChange(emp.employee_id, "card_payment", parseFloat(e.target.value) || "")} // Permitir edición
    onBlur={(e) => handleInputChange(emp.employee_id, "card_payment", e.target.value === "" ? 0 : parseFloat(e.target.value).toFixed(1))} // Establecer 0 si está vacío
    variant="standard"
    size="small"
    type="number"
    disabled={isLocked}
    inputProps={{ style: { width: 80 } }}
    
  />
      </TableCell>
      <TableCell sx={{ background: "#ff4444", color: "#fff", fontWeight: 700 }}>${emp.cash_payment}</TableCell>
      <TableCell>${emp.total_payment}</TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PayrollTable;