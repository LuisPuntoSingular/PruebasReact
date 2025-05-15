import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Select, MenuItem, TextField, FormControl
  } from '@mui/material';
  import React, { useState, useEffect } from "react";
  import { AttendanceCode } from "./AttendanceCodesTable";
  
  interface EmployeeRow {
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
    startDate: Date; // <-- nueva prop para fechas
  }
  
  const EmployeeTable: React.FC<Props> = ({
    employees,
    attendanceCodes,
    onChange,
    exportToExcel,
    handleSubmit,
    startDate
  }) => {
    const [localEmployees, setLocalEmployees] = useState<EmployeeRow[]>(employees);
  
    useEffect(() => {
      setLocalEmployees(employees);
    }, [employees]);
  
    const handleExtraTimeChange = (id: number, day: string, value: number | string) => {
      setLocalEmployees((prev) => {
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
        onChange(updated); // Solo aquí notificas al padre
        return updated;
      });
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
  
    // Función para obtener la fecha de cada día a partir del lunes
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
            onClick={handleSubmit}
          >
            Guardar información
          </Button>
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
                            onChange={(e) => handleExtraTimeChange(emp.id, day, e.target.value)}
                            sx={{
                              background: "#fff",
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
                          onChange={(e) => handleExtraTimeChange(emp.id, day, parseInt(e.target.value, 10))}
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