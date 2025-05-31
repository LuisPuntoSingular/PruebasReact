import { Box, Typography, TextField } from "@mui/material";

interface Props {
  selectedWeek: number;
  setSelectedWeek: (n: number) => void;
  selectedYear: number;
  setSelectedYear: (n: number) => void;
  weekRange: string;
}

const PayrollWeekSelector: React.FC<Props> = ({
  selectedWeek, setSelectedWeek, selectedYear, setSelectedYear, weekRange
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>Semana</Typography>
      <TextField
        type="number"
        size="medium"
        value={selectedWeek}
        onChange={e => setSelectedWeek(Number(e.target.value))}
        inputProps={{ min: 1, max: 53, style: { width: 80, textAlign: "center", fontSize: "1.5rem" } }}
        sx={{ width: 100, '& .MuiInputBase-input': { fontSize: '1.5rem', py: 2 } }}
      />
      <Typography variant="h5" sx={{ fontWeight: 600 }}>Año</Typography>
      <TextField
        type="number"
        size="medium"
        value={selectedYear}
        onChange={e => setSelectedYear(Number(e.target.value))}
        inputProps={{ min: 2000, max: 2100, style: { width: 80, textAlign: "center", fontSize: "1.5rem" } }}
        sx={{ width: 100, '& .MuiInputBase-input': { fontSize: '1.5rem', py: 2 } }}
      />
    </Box>
    <Typography variant="h6" sx={{ color: "#555", fontSize: "1.3rem", mt: 1 }}>{weekRange}</Typography>
  </Box>
);

export default PayrollWeekSelector;