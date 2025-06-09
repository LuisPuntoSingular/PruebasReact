import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { AttendanceCode } from "../AttendanceCodesTable";

interface Props {
  empId: number;
  day: string;
  value: { day: string; extraTime: number };
  attendanceCodes: AttendanceCode[];
  onExtraTimeChange: (id: number, day: string, value: number | string) => void;
  extraTimeInput: string;
  setExtraTimeInput: (day: string, value: string) => void;
}

const EmployeeDayCell: React.FC<Props> = ({
  empId,
  day,
  value,
  attendanceCodes,
  onExtraTimeChange,
  extraTimeInput,
  setExtraTimeInput,
}) => {
  const handleSelectChange = (e: SelectChangeEvent) => {
    onExtraTimeChange(empId, day, e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setExtraTimeInput(day, val);
  };

  const handleBlur = () => {
    let val = parseFloat(extraTimeInput);
    if (isNaN(val)) val = 0;
    const formatted = val.toFixed(2);
    setExtraTimeInput(day, formatted);
    onExtraTimeChange(empId, day, val);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 120,
        gap: 1.5,
        p: 0,
      }}
    >
      <FormControl size="small" variant="standard" sx={{ minWidth: 70, maxWidth: 90 }}>
        <Select
          labelId={`select-label-${empId}-${day}`}
          value={value.day || ""}
          onChange={handleSelectChange}
          sx={{
            background: value.day === "?" || value.day === "" ? "#fff59d" : "#a5d6a7",
            fontSize: "1.1rem",
            minWidth: 90,
            maxWidth: 120,
            ".MuiSelect-select": { p: "8px 12px" },
          }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 180 } } }}
          displayEmpty
        >
          <MenuItem value="">
            <em>---</em>
          </MenuItem>
          {attendanceCodes.map((code) => (
            <MenuItem key={code.code} value={code.code} sx={{ fontSize: "1.1rem" }}>
              {code.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        size="small"
        type="text"
        value={extraTimeInput}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          style: {
            padding: "8px 8px",
            fontSize: "1.1rem",
            textAlign: "center",
            width: 60,
            height: 28,
          },
        }}
        sx={{
          background: "#fff",
          minWidth: 70,      // <-- opcional: también puedes aumentar minWidth
    maxWidth: 80, 
          "& .MuiInputBase-input": {
            p: "8px 8px",
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
};

// Evita render innecesario si las props no cambian
function areEqual(prevProps: Props, nextProps: Props) {
  return (
    prevProps.empId === nextProps.empId &&
    prevProps.day === nextProps.day &&
    prevProps.extraTimeInput === nextProps.extraTimeInput &&
    prevProps.value.day === nextProps.value.day &&
    prevProps.attendanceCodes === nextProps.attendanceCodes
  );
}

export default React.memo(EmployeeDayCell, areEqual);
