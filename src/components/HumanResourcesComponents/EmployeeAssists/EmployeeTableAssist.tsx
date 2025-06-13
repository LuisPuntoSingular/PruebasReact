import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, CircularProgress
} from '@mui/material';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AttendanceCode } from "./AttendanceCodesTable";
import { uploadAttendanceExcel, getEmployeesAssist,getApprovedVacationsByEmployeesAndDateRange } from "./Services/attendanceService";
import {
  updateEmployeesFromExcel,
  handleExtraTimeChange,
  dayTranslations,
  getDayDate,
  hasQuestionMarkOrEmpty,
  exportToExcel,
  handleSubmitLogic,
  EmployeeRow,
  setVacationDays
} from "./Logic/employeeTableLogic";
import EmployeeRowComponent from "./Components/EmployeeRowComponent";
import { getAttendanceByEmployeeAndDateRange } from "./Services/attendanceService";

interface Props {
  selectedWeek: number;
  attendanceCodes: AttendanceCode[];
  startDate: Date;
  endDate: Date;
}

const EmployeeTable: React.FC<Props> = ({
  attendanceCodes,
  startDate,
  endDate,
  selectedWeek,
}) => {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [filter, setFilter] = useState<"all" | "carton" | "madera">("all");
  const [localEmployees, setLocalEmployees] = useState<EmployeeRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [, setLoading] = useState(false);
  const [excelUploaded, setExcelUploaded] = useState(false);

  // Filtrar empleados según el filtro seleccionado
  const filteredEmployees = localEmployees.filter(emp => {
    if (filter === "all") return true;
    if (filter === "carton") return emp.plant_id === 2;
    if (filter === "madera") return emp.plant_id === 1;
    return true;
  });

  // Verifica si hay campos vacíos o con "?"
  const hasQuestionMark = hasQuestionMarkOrEmpty(filteredEmployees);

  // Efecto para cargar todos los empleados al iniciar
  useEffect(() => {
    const fetchAllEmployees = async () => {
      setLoading(true);
      try {
        const allEmployees = await getEmployeesAssist();

        const formatted = allEmployees
          .filter(employee => employee.id && employee.status === true) // Solo empleados activos
          .map((employee) => ({
            id: employee.id,
            plant_id: employee.plant_id,
            full_name: `${employee.first_name} ${employee.second_name} ${employee.last_name_paterno} ${employee.last_name_materno}`,
            monday: { day: "", extraTime: 0 },
            tuesday: { day: "", extraTime: 0 },
            wednesday: { day: "", extraTime: 0 },
            thursday: { day: "", extraTime: 0 },
            friday: { day: "", extraTime: 0 },
            saturday: { day: "", extraTime: 0 },
            sunday: { day: "", extraTime: 0 },
            totalExtraTime: 0,
          }));

        setEmployees(formatted);
      } catch (error) {
        console.error("Error al obtener todos los empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmployees();
  }, []);


// Efecto para cargar asistencia de empleados según el rango de fechas y semana seleccionada
useEffect(() => {
  const fetchAndSetAttendance = async () => {
    if (employees.length === 0) {
      setLocalEmployees([]);
      return;
    }

    // Siempre parte de los empleados base (vacíos)
   const baseEmployees = employees.map(emp => ({
      ...emp,
      monday: { ...emp.monday },
      tuesday: { ...emp.tuesday },
      wednesday: { ...emp.wednesday },
      thursday: { ...emp.thursday },
      friday: { ...emp.friday },
      saturday: { ...emp.saturday },
      sunday: { ...emp.sunday },
      totalExtraTime: 0,
    }));

    const startDateStr = startDate.toISOString().slice(0, 10);
    const endDateStr = endDate.toISOString().slice(0, 10);

    const allAttendance = await Promise.all(
      employees.map(async (emp) => {
        try {
          const records = await getAttendanceByEmployeeAndDateRange(
            emp.id,
            startDateStr,
            endDateStr,
            selectedWeek
          );
          return { empId: emp.id, records };
        } catch  {
          return { empId: emp.id, records: [] };
        }
      })
    );

    // Aplica los registros si existen, si no, deja los datos base
    const updated = baseEmployees.map((emp) => {
      const found = allAttendance.find((a) => a.empId === emp.id);
      if (!found || !found.records.length) return emp;

      const dias = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const empActualizado = { ...emp };

      found.records.forEach((rec) => {
        const fechaRegistro = rec.date?.slice(0, 10);
        for (let i = 0; i < 7; i++) {
          const fechaDia = new Date(startDate);
          fechaDia.setDate(startDate.getDate() + i);
          const fechaDiaStr = fechaDia.toISOString().slice(0, 10);

          if (fechaDiaStr === fechaRegistro) {
            const dia = dias[i];
            empActualizado[dia] = {
              ...empActualizado[dia],
              day: rec.code || empActualizado[dia]?.day || "",
              extraTime: Number(rec.overtime_hours ?? empActualizado[dia]?.extraTime ?? 0),
            };
          }
        }
      });

      empActualizado.totalExtraTime = dias
        .map((d) => (empActualizado[d] as { day: string; extraTime: number }).extraTime)
        .reduce((sum, extraTime) => sum + extraTime, 0);

      return empActualizado;
    });

    setLocalEmployees(updated);
  };

  fetchAndSetAttendance();
}, [employees, startDate, endDate, selectedWeek]);

  // Cuando cambian empleados cargados, actualizar localEmployees
  useEffect(() => {
    setLoadingTable(true);
    setLocalEmployees(employees);
  }, [employees]);

  // Cuando localEmployees ya tiene datos, quitar loading tabla
  useEffect(() => {
    if (localEmployees.length > 0) {
      setLoadingTable(false);
    }
  }, [localEmployees]);

 


  // Manejar cambio de extraTime o código
  const onExtraTimeChange = useCallback(
    (id: number, day: string, value: number | string) => {
      setLocalEmployees((prev) => {
        const updated = handleExtraTimeChange(prev, id, day, value);
        if (JSON.stringify(prev) !== JSON.stringify(updated)) {
          setEmployees(updated); // Actualiza el estado global interno
          return updated;
        }
        return prev;
      });
    },
    []
  );

  // Manejo de carga de archivo Excel


const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  setUploading(true);
  try {
    const fecha_inicio = startDate.toISOString().slice(0, 10);
    const fecha_final = endDate.toISOString().slice(0, 10);

    // 1. Obtén vacaciones aprobadas para todos los empleados visibles
    const employeeIds = localEmployees.map(emp => emp.id);
    const vacationsByEmployee = await getApprovedVacationsByEmployeesAndDateRange(
      employeeIds,
      fecha_inicio,
      fecha_final
    );

    // 2. Marca los días de vacaciones en el estado antes de procesar el Excel
    setLocalEmployees(prev => setVacationDays(prev, vacationsByEmployee, startDate));

    // 3. Procesa el Excel, pero NO sobrescribas los días "V"
    const data = await uploadAttendanceExcel(file, fecha_inicio, fecha_final);
    if (Array.isArray(data)) {
      setLocalEmployees(prev => {
        const updated = updateEmployeesFromExcel(
          prev,
          data,
          startDate,
          (oldDay) => oldDay !== "V" // No sobrescribir días de vacaciones
        );
        setEmployees(updated);
        return updated;
      });
      setExcelUploaded(true);
      alert("Archivo procesado correctamente");
    } else {
      alert("La respuesta del backend no contiene el formato esperado.");
    }
  } catch (error) {
    alert(`Error al procesar el archivo. ${error}`);
  } finally {
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};
  // Efecto para reiniciar el estado de Excel cargado y limpiar "V" cuando cambian las fechas o la semana seleccionada
useEffect(() => {
  setExcelUploaded(false);

  // Limpia las "V" de localEmployees
  setLocalEmployees(prev =>
    prev.map(emp => {
      const cleanEmp = { ...emp };
      ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach(day => {
        if (cleanEmp[day].day === "V") {
          cleanEmp[day] = { ...cleanEmp[day], day: "" };
        }
      });
      return cleanEmp;
    })
  );
}, [startDate, endDate, selectedWeek]);

  // Botón exportar
  const handleExport = () => exportToExcel(employees);

  // Botón guardar
  const handleSubmit = () => handleSubmitLogic(employees, startDate, selectedWeek);

  return (
    <Box sx={{ width: "100%", position: "relative", mb: 3 }}>
      {/* Botones de filtro */}
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={filter === "carton" ? "contained" : "outlined"}
          onClick={() => setFilter("carton")}
        >
          Cartón
        </Button>
        <Button
          variant={filter === "madera" ? "contained" : "outlined"}
          onClick={() => setFilter("madera")}
        >
          Madera
        </Button>
      </Box>
      {(loadingTable || uploading) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.7)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ position: "absolute", top: -48, right: 0, zIndex: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="success" onClick={handleExport}>
          Exportar a Excel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={hasQuestionMark}
        >
          Guardar información
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Subiendo..." : "Subir asistencias"}
        </Button>
        <input
          type="file"
          accept=".xls,.xlsx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </Box>
      <TableContainer component={Paper} elevation={3} sx={{ width: "100%" }}>
        <Table size="small" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  background: "#f5f5f5",
                  minWidth: 140,
                  maxWidth: 200,
                  fontSize: "1rem",
                  textAlign: "center",
                  padding: "6px 8px"
                }}
              >
                Nombre Completo
              </TableCell>
              {Object.keys(dayTranslations).map((day, idx) => (
                <TableCell
                  key={day}
                  sx={{
                    fontWeight: 600,
                    background: "#f5f5f5",
                    minWidth: 90,
                    maxWidth: 120,
                    fontSize: "1rem",
                    textAlign: "center",
                    padding: "6px 8px"
                  }}
                >
                  {dayTranslations[day]}
                  <br />
                  <span style={{ fontSize: "0.85em", color: "#888" }}>
                    {getDayDate(startDate, idx)}
                  </span>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: 600,
                  background: "#f5f5f5",
                  minWidth: 90,
                  maxWidth: 120,
                  fontSize: "1rem",
                  textAlign: "center",
                  padding: "6px 8px"
                }}
              >
                T.E TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <EmployeeRowComponent
               excelUploaded={excelUploaded}
                key={emp.id}
                emp={emp}
                attendanceCodes={attendanceCodes}
                onExtraTimeChange={onExtraTimeChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;