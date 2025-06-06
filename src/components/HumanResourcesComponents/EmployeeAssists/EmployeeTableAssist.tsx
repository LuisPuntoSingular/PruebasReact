import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, CircularProgress
} from '@mui/material';
import React, { useState, useEffect, useRef, useCallback } from "react";
import ExcelJS from "exceljs";
import { AttendanceCode } from "./AttendanceCodesTable";
import { uploadAttendanceExcel } from "./Services/attendanceService";
import {
  updateEmployeesFromExcel,
  handleExtraTimeChange,
  dayTranslations,
  getDayDate,
  hasQuestionMarkOrEmpty
} from "./Logic/employeeTableLogic";
import EmployeeRowComponent from "./Components/EmployeeRowComponent";
import { buildAttendanceRecords, sendAttendanceRecords } from "./Services/attendanceService";
import { getEmployees } from "../Apis/employeeApi";

// Define la interfaz EmployeeRow
export interface EmployeeRow {
  id: number;
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

interface Props {
  selectedWeek: number; // Agregado porque se usa en buildAttendanceRecords
  attendanceCodes: AttendanceCode[];
  startDate: Date;
  endDate: Date;
 // Agregado porque se usa en onExtraTimeChange
                       // Agregado porque se usa en botón exportar
}

const EmployeeTable: React.FC<Props> = ({
  attendanceCodes,
  startDate,
  endDate,

  selectedWeek,

}) => {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [localEmployees, setLocalEmployees] = useState<EmployeeRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [, setLoading] = useState(false);

  // Verifica si hay campos vacíos o con "?"
  const hasQuestionMark = hasQuestionMarkOrEmpty(localEmployees);


useEffect(() => {
  const fetchAllEmployees = async () => {
    console.time("getEmployees");

    setLoading(true);
    try {
      const allEmployees = await getEmployees();
      console.timeEnd("getEmployees");

      const formatted = allEmployees
        .filter(employee => employee.id)
        .map((employee) => ({
          id: employee.id,
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

useEffect(() => {
  if (employees.length > 0) {
    const t0 = performance.now();
    requestAnimationFrame(() => {
      const t1 = performance.now();
      console.log("Tiempo de render de tabla:", t1 - t0, "ms");
    });
  }
}, [employees]);


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
      alert(`"Error al procesar el archivo. "${error}`,);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };


  // Exportar a Excel usando ExcelJS
  const exportToExcel = async () => {
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

  // Guardar información en el backend
  const handleSubmit = async () => {
    try {
      // Solo envía los registros con datos capturados (código o horas extra)
      const recordsToSend = buildAttendanceRecords(employees, startDate, selectedWeek)
        .filter(record => (record.code && record.code !== "") || record.overtime_hours > 0);
       
      await sendAttendanceRecords(recordsToSend);
      alert("Asistencias guardadas correctamente");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar las asistencias");
    }
  };




  return (
    <Box sx={{ width: "100%", position: "relative", mb: 3 }}>
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
        <Button variant="contained" color="success" onClick={exportToExcel}>
          Exportar a Excel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
              // Manejo de carga de archivo Excel
 
            handleSubmit();
          }}
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
            {localEmployees.map((emp) => (
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
