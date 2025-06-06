import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, CircularProgress
} from '@mui/material';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AttendanceCode } from "./AttendanceCodesTable";
import { uploadAttendanceExcel, getEmployeesAssist } from "./Services/attendanceService";
import {
  updateEmployeesFromExcel,
  handleExtraTimeChange,
  dayTranslations,
  getDayDate,
  hasQuestionMarkOrEmpty,
  exportToExcel,
  handleSubmitLogic,
  EmployeeRow
} from "./Logic/employeeTableLogic";
import EmployeeRowComponent from "./Components/EmployeeRowComponent";

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
            full_name: `${employee.first_name} ${employee.last_name_paterno} ${employee.last_name_materno}`,
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
      const data = await uploadAttendanceExcel(file, fecha_inicio, fecha_final);
      if (Array.isArray(data)) {
        setLocalEmployees((prev) => {
          const updated = updateEmployeesFromExcel(prev, data, startDate);
          setEmployees(updated); // Actualiza el estado global interno
          return updated;
        });
        alert("Archivo procesado correctamente");
      } else {
        alert("La respuesta del backend no contiene el formato esperado.");
      }
    } catch (error) {
      alert(`"Error al procesar el archivo. "${error}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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