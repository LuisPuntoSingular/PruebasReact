import React, { useEffect, useState } from "react";
import { useUserSessionInfo } from "@/context/GlobalApis/UserSessionInfoContext";
import { fetchEmployee } from "@/context/GlobalApis/UserSessionFunctions/userSessionFunctions";
import { getEmployeesByWorkAreaAndPlant, getAttendanceCodes, AttendanceCode } from "../components/HumanResourcesComponents/Apis/employeeAssistsApi";
import ExcelJS from "exceljs";
import AttendanceCodesTable from "../components/HumanResourcesComponents/EmployeeAssists/AttendanceCodesTable";
import WeekSelector from "../components/HumanResourcesComponents/EmployeeAssists/WeekSelector";
import EmployeeTable from "../components/HumanResourcesComponents/EmployeeAssists/EmployeeTable";
import { buildAttendanceRecords, sendAttendanceRecords } from "../components/HumanResourcesComponents/EmployeeAssists/attendanceService";
import { Box } from "@mui/material";

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

const getCurrentWeekNumber = () => {
  const today = new Date();
  const firstJan = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
};

const getMondayOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay();
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getWeekRangeFromMonday = (monday: Date) => {
  const weekStart = new Date(monday);
  const weekEnd = new Date(monday);
  weekEnd.setDate(weekStart.getDate() + 6);
  return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
};

const UserProfile: React.FC = () => {
  const { employeeId, isAuthenticated } = useUserSessionInfo();
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [attendanceCodes, setAttendanceCodes] = useState<AttendanceCode[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(getCurrentWeekNumber());
  const [startDate, setStartDate] = useState<Date>(() => getMondayOfWeek(new Date()));
  const [weekRange, setWeekRange] = useState<string>(getWeekRangeFromMonday(getMondayOfWeek(new Date())));

  useEffect(() => {
    setWeekRange(getWeekRangeFromMonday(startDate));
  }, [startDate]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const monday = new Date(year, 0, 1 + (selectedWeek - 1) * 7);
    setStartDate(getMondayOfWeek(monday));
  }, [selectedWeek]);

  useEffect(() => {
    const getEmployeeData = async () => {
      if (employeeId) {
        try {
          const data = await fetchEmployee(employeeId);
          if (data && data.plant_id && data.work_area_id) {
            const plantId = typeof data.plant_id === "number" ? data.plant_id : parseInt(data.plant_id, 10);
            const workAreaId = typeof data.work_area_id === "number" ? data.work_area_id : parseInt(data.work_area_id, 10);
            const employeesByAreaAndPlant = await getEmployeesByWorkAreaAndPlant(plantId, workAreaId);
            setEmployees(
              employeesByAreaAndPlant
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
                }))
            );
          }
        } catch (error) {
          console.error("Error al obtener los datos del empleado:", error);
        }
      }
    };

    const fetchAttendanceCodes = async () => {
      try {
        const codes = await getAttendanceCodes();
        setAttendanceCodes(codes);
      } catch (error) {
        console.error("Error al cargar los códigos de asistencia:", error);
      }
    };

    getEmployeeData();
    fetchAttendanceCodes();
  }, [employeeId]);

  if (!isAuthenticated) {
    return <div>No estás autenticado</div>;
  }

  // Recibe cambios de semana y fecha
  const handleWeekChange = (week: number, date: Date) => {
    setSelectedWeek(week);
    setStartDate(date);
  };

  // Recibe cambios de empleados desde EmployeeTable
  const handleEmployeesChange = (newEmployees: EmployeeRow[]) => {
    setEmployees(newEmployees);
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", mb: 3, width: "100%" }}>
        <AttendanceCodesTable attendanceCodes={attendanceCodes} />
        <WeekSelector
          selectedWeek={selectedWeek}
          startDate={startDate}
          weekRange={weekRange}
          onChange={handleWeekChange}
          getMondayOfWeek={getMondayOfWeek}
        />
      </Box>
      <EmployeeTable
        employees={employees}
        attendanceCodes={attendanceCodes}
        onChange={handleEmployeesChange}
        exportToExcel={exportToExcel}
        handleSubmit={handleSubmit}
        startDate={startDate}
      />
    </Box>
  );
};

export default UserProfile;