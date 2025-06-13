import { Box, Typography, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import React, { useState, useEffect } from "react";

interface Props {
  selectedWeek: number;
  startDate: Date;
  weekRange: string;
  onChange: (week: number, startDate: Date) => void;
  getMondayOfWeek: (d: Date) => Date;
}

const WeekSelector: React.FC<Props> = ({
  selectedWeek, startDate, weekRange, onChange, getMondayOfWeek
}) => {
  const [week, setWeek] = useState(selectedWeek);
  const [date, setDate] = useState<Date>(startDate);

  useEffect(() => {
    onChange(week, date);
    // eslint-disable-next-line
  }, [week, date]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        mt: 0,
        mb: 3,
        minWidth: 350,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        Incidencias
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Semana
          </Typography>
          <TextField
            type="number"
            size="medium"
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            inputProps={{ min: 1, max: 53, style: { width: 80, textAlign: "center", fontSize: "1.5rem" } }}
            sx={{ width: 100, '& .MuiInputBase-input': { fontSize: '1.5rem', py: 2 } }}
          />
         <DesktopDatePicker
  label="Inicio de semana"
  value={date}
  onChange={(d) => {
    if (d instanceof Date && !isNaN(d.getTime())) {
      setDate(getMondayOfWeek(d));
    }
  }}
  slotProps={{
    textField: {
      size: "medium",
      sx: { minWidth: 180, '& .MuiInputBase-input': { fontSize: '1.2rem', py: 2 } },
      InputLabelProps: { style: { fontSize: '1.2rem' } }
    },
  }}
/>
          <Typography variant="h6" sx={{ color: "#555", fontSize: "1.3rem" }}>
            {weekRange}
          </Typography>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default WeekSelector;