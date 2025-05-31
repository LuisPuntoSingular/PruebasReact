import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Select, MenuItem, TextField, FormControl
} from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import { AttendanceCode } from "./AttendanceCodesTable";
import { uploadAttendanceExcel } from "./Services/attendanceService";
import { updateEmployeesFromExcel, handleExtraTimeChange} from "./Logic/employeeTableLogic";

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
  employees: EmployeeRow[];
  attendanceCodes: AttendanceCode[];
  onChange: (employees: EmployeeRow[]) => void;
  exportToExcel: () => void;
  handleSubmit: () => void;
  startDate: Date;
  endDate: Date;
}

const EmployeeTable: React.FC<Props> = ({
  employees,
  attendanceCodes,
  onChange,
  exportToExcel,
  handleSubmit,
  startDate,
  endDate
}) => {
  const [localEmployees, setLocalEmployees] = useState<EmployeeRow[]>(employees);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [hasQuestionMark, setHasQuestionMark] = useState(false);

 useEffect(() => {
  // Verifica si hay algún "?" o algún campo vacío en los códigos de asistencia
  const found = localEmployees.some(emp =>
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      .some(day => {
        const code = (emp[day as keyof EmployeeRow] as { day: string }).day;
        return code === "?" || code === "";
      })
  );
  setHasQuestionMark(found);
}, [localEmployees]);

  useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  // Usa la función de lógica para cambios en horas extra/código
const onExtraTimeChange = (id: number, day: string, value: number | string) => {
  setLocalEmployees((prev) => {
    const updated = handleExtraTimeChange(prev, id, day, value);

    // Verifica si realmente hay un cambio antes de actualizar el estado
    const hasChanged = JSON.stringify(prev) !== JSON.stringify(updated);
    if (hasChanged) {
      onChange(updated); // Notifica al componente padre solo si hay cambios
      return updated;
    }

    return prev; // No actualiza el estado si no hay cambios
  });
};

  // Usa la función de lógica para actualizar desde Excel
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const fecha_inicio = startDate.toISOString().slice(0, 10);
  const fecha_final = endDate.toISOString().slice(0, 10);

  setUploading(true);
  try {
    // Llama a la función que procesa el archivo Excel
    const data = await uploadAttendanceExcel(file, fecha_inicio, fecha_final);

    // Verifica si el backend devolvió un arreglo
    if (Array.isArray(data)) {
      // Actualiza los empleados con los datos del Excel
      setLocalEmployees((prev) =>
        updateEmployeesFromExcel(prev, data, startDate, onChange)
      );
      alert("Archivo procesado correctamente");
    } else {
      alert("La respuesta del backend no contiene el formato esperado.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Error al procesar el archivo: ${error.message}`);
    } else {
      alert("Error desconocido al procesar el archivo.");
    }
  } finally {
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};


  const dayTranslations: { [key: string]: string } = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  const getDayDate = (startDate: Date, dayIndex: number) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + dayIndex);
    return date.toLocaleDateString();
  };

  return (
    <Box sx={{ width: "100%", position: "relative", mb: 3 }}>
      <Box sx={{ position: "absolute", top: -48, right: 0, zIndex: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={exportToExcel}
        >
          Exportar a Excel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onChange(localEmployees);
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
              <TableCell sx={{ fontWeight: 600, background: "#f5f5f5", minWidth: 140, maxWidth: 200, fontSize: "1rem", textAlign: "center", padding: "6px 8px" }}>
                Nombre Completo
              </TableCell>
              {Object.keys(dayTranslations).map((day, idx) => (
                <TableCell key={day} sx={{ fontWeight: 600, background: "#f5f5f5", minWidth: 90, maxWidth: 120, fontSize: "1rem", textAlign: "center", padding: "6px 8px" }}>
                  {dayTranslations[day]}
                  <br />
                  <span style={{ fontSize: "0.85em", color: "#888" }}>
                    {getDayDate(startDate, idx)}
                  </span>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600, background: "#f5f5f5", minWidth: 90, maxWidth: 120, fontSize: "1rem", textAlign: "center", padding: "6px 8px" }}>
                Horas Extra Totales
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.full_name}</TableCell>
                {Object.keys(dayTranslations).map((day) => (
                  <TableCell key={day}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        minWidth: 0,
                        maxWidth: 120,
                        p: 0,
                        gap: 1.5,
                      }}
                    >
                      <FormControl size="small" variant="standard" sx={{ minWidth: 70, maxWidth: 90 }}>
                        <Select
  labelId={`select-label-${emp.id}-${day}`}
  value={(emp[day as keyof EmployeeRow] as { day: string; extraTime: number }).day || ""}
  onChange={(e) => onExtraTimeChange(emp.id, day, e.target.value)}
  sx={{
    background:
      (emp[day as keyof EmployeeRow] as { day: string }).day === "?" ||
      (emp[day as keyof EmployeeRow] as { day: string }).day === ""
        ? "#fff59d" // amarillo si es "?" o ""
        : "#a5d6a7", // verde si tiene valor válido
    fontSize: "1.1rem",
    minWidth: 90,
    maxWidth: 120,
    '.MuiSelect-select': { p: '8px 12px' }
  }}
  MenuProps={{ PaperProps: { sx: { maxHeight: 180 } } }}
  displayEmpty
>
  <MenuItem value=""><em>---</em></MenuItem>
  {attendanceCodes.map((code) => (
    <MenuItem key={code.code} value={code.code} sx={{ fontSize: "1.1rem" }}>
      {code.code}
    </MenuItem>
  ))}
</Select>
                      </FormControl>
                      <TextField
                        type="number"
                        size="small"
                        value={(emp[day as keyof EmployeeRow] as { day: string; extraTime: number }).extraTime}
                        onChange={(e) => onExtraTimeChange(emp.id, day, parseInt(e.target.value, 10))}
                        inputProps={{
                          min: 0,
                          style: {
                            padding: "8px 8px",
                            fontSize: "1.1rem",
                            textAlign: "center",
                            width: 48,
                            height: 28,
                          }
                        }}
                        label=""
                        sx={{
                          background: "#fff",
                          minWidth: 48,
                          maxWidth: 60,
                          '& .MuiInputBase-input': { p: "8px 8px", textAlign: "center" }
                        }}
                      />
                    </Box>
                  </TableCell>
                ))}
                <TableCell>
                  <span style={{ fontSize: "1rem" }}>{emp.totalExtraTime}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;