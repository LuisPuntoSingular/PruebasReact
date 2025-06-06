import React, { useEffect, useState } from "react";
import { getAttendanceCodes, AttendanceCode } from "../components/HumanResourcesComponents/Apis/employeeAssistsApi";



import AttendanceCodesTable from "../components/HumanResourcesComponents/EmployeeAssists/AttendanceCodesTable";
import WeekSelector from "../components/HumanResourcesComponents/EmployeeAssists/WeekSelector";
import EmployeeTable from "../components/HumanResourcesComponents/EmployeeAssists/EmployeeTableAssist";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";


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

const Incidents: React.FC = () => {

  const [attendanceCodes, setAttendanceCodes] = useState<AttendanceCode[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(getCurrentWeekNumber());
  const [startDate, setStartDate] = useState<Date>(() => getMondayOfWeek(new Date()));
  const [weekRange, setWeekRange] = useState<string>(getWeekRangeFromMonday(getMondayOfWeek(new Date())));
  const endDate = new Date(startDate);
  const [loading, setLoading] = useState(false);
  const [submitting,] = useState(false);

  endDate.setDate(startDate.getDate() + 6);

  useEffect(() => {
    setWeekRange(getWeekRangeFromMonday(startDate));
  }, [startDate]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const monday = new Date(year, 0, 1 + (selectedWeek - 1) * 7);
    setStartDate(getMondayOfWeek(monday));
  }, [selectedWeek]);

  useEffect(() => {
  const fetchAttendanceCodes = async () => {
    setLoading(true);
    try {
      const codes = await getAttendanceCodes();
      setAttendanceCodes(codes);
    } catch (error) {
      console.error("Error al cargar los códigos de asistencia:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAttendanceCodes();
}, []);

  const handleWeekChange = (week: number, date: Date) => {
    setSelectedWeek(week);
    setStartDate(date);
  };


  return (
    <Box sx={{ p: 3, position: "relative" }}>
      {(loading || submitting) && (
        <Box
          sx={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
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
        attendanceCodes={attendanceCodes}
        startDate={startDate}
        endDate={endDate}
      
        selectedWeek={selectedWeek}
      />
    </Box>
  );
};

export default Incidents;