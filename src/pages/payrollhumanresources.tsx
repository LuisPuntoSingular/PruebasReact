import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PayrollWeekSelector from "../components/PayRollHumanResources/PayrollWeekSelector";
import PayrollTable from "../components/PayRollHumanResources/PayrollTabale";

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

const PayrollHumanResources: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(() => {
    const today = new Date();
    const firstJan = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  });
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [startDate, setStartDate] = useState<Date>(() => getMondayOfWeek(new Date()));
  const [weekRange, setWeekRange] = useState<string>(getWeekRangeFromMonday(getMondayOfWeek(new Date())));
 

  useEffect(() => {
    setWeekRange(getWeekRangeFromMonday(startDate));
  }, [startDate]);

  useEffect(() => {
    const year = selectedYear;
    const monday = new Date(year, 0, 1 + (selectedWeek - 1) * 7);
    setStartDate(getMondayOfWeek(monday));
  }, [selectedWeek, selectedYear]);

 

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
        Nómina Recursos Humanos
      </Typography>
      <PayrollWeekSelector
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        weekRange={weekRange}
      />
      <PayrollTable
      selectedWeek={selectedWeek}
      selectedYear={selectedYear}
       />
    </Box>
  );
};

export default PayrollHumanResources;