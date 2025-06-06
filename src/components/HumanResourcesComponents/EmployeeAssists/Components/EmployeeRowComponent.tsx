import React, { useState, useMemo, useCallback,useEffect } from "react";
import { TableRow, TableCell } from "@mui/material";
import { dayTranslations } from "../Logic/employeeTableLogic";
import { EmployeeRow } from "../EmployeeTableAssist";
import { AttendanceCode } from "../AttendanceCodesTable";
import EmployeeDayCell from "./EmployeeDayCell";

interface Props {
  emp: EmployeeRow;
  attendanceCodes: AttendanceCode[];
  onExtraTimeChange: (id: number, day: string, value: number | string) => void;
}

const EmployeeRowComponent: React.FC<Props> = React.memo(
  ({ emp, attendanceCodes, onExtraTimeChange }) => {
    const initialExtraTimeInputs = useMemo(() => {
      const initial: { [day: string]: string } = {};
      Object.keys(dayTranslations).forEach((day) => {
        initial[day] = (
          emp[day as keyof EmployeeRow] as { extraTime: number }
        ).extraTime.toFixed(2);
      });
      return initial;
    }, [emp]);

    const [extraTimeInputs, setExtraTimeInputs] = useState(initialExtraTimeInputs);

    // Sincroniza el estado local con los cambios en emp
    useEffect(() => {
      setExtraTimeInputs(initialExtraTimeInputs);
    }, [initialExtraTimeInputs]);

    const memoSetExtraTimeInput = useCallback(
      (day: string, value: string) => {
        setExtraTimeInputs((prev) => ({ ...prev, [day]: value }));
      },
      []
    );

    const memoOnExtraTimeChange = useCallback(
      (id: number, day: string, value: number | string) => {
        onExtraTimeChange(id, day, value);
      },
      [onExtraTimeChange]
    );

    return (
      <TableRow key={emp.id}>
        <TableCell sx={{ fontSize: "0.9rem", textAlign: "center" }}>
          {emp.id}
        </TableCell>
        <TableCell>{emp.full_name}</TableCell>
        {Object.keys(dayTranslations).map((day) => (
          <TableCell key={day}>
            <EmployeeDayCell
              empId={emp.id}
              day={day}
              value={emp[day as keyof EmployeeRow] as {
                day: string;
                extraTime: number;
              }}
              attendanceCodes={attendanceCodes}
              onExtraTimeChange={memoOnExtraTimeChange}
              extraTimeInput={extraTimeInputs[day]}
              setExtraTimeInput={memoSetExtraTimeInput}
            />
          </TableCell>
        ))}
        <TableCell>
          <span style={{ fontSize: "1rem" }}>
            {emp.totalExtraTime.toFixed(2)}
          </span>
        </TableCell>
      </TableRow>
    );
  }
);

EmployeeRowComponent.displayName = "EmployeeRowComponent";


export default EmployeeRowComponent;
