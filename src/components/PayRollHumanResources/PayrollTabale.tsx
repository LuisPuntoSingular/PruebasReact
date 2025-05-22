import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box
} from "@mui/material";
import { CSVLink } from "react-csv";
import { getProcessedEmployees, handleInputChangeLogic, getTotals } from "./Logic/payrollTableLogic";

interface Props {
  selectedWeek: number;
  selectedYear: number;
}
export interface Employee {
  id: number;
  full_name: string;
  salario: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  total_te: number;
  importe_te: number;
  infonavit: string;
  fonacot: string;
  total_percepciones: number;
  debe: string;
  abono: string;
  restan: number;
  otros: string;
  bono_normal: string;
  bono_mensual: string;
  tarjeta: string;
  efectivo: number;
  tota: number;
}

const csvHeaders = [
  { label: "Nombre", key: "full_name" },
  { label: "Lun", key: "monday" },
  { label: "Mar", key: "tuesday" },
  { label: "Mie", key: "wednesday" },
  { label: "Jue", key: "thursday" },
  { label: "Vie", key: "friday" },
  { label: "Sab", key: "saturday" },
  { label: "Dom", key: "sunday" },
  { label: "Total T.E.", key: "total_te" },
  { label: "Importe de T.E.", key: "importe_te" },
  { label: "Sueldo", key: "salario" },
  { label: "INFONAVIT", key: "infonavit" },
  { label: "FONACOT", key: "fonacot" },
  { label: "TOTAL PERCEPCIONES", key: "total_percepciones" },
  { label: "Debe", key: "debe" },
  { label: "Abono", key: "abono" },
  { label: "Restan", key: "restan" },
  { label: "OTROS", key: "otros" },
  { label: "Bono normal", key: "bono_normal" },
  { label: "Bono mensual", key: "bono_mensual" },
  { label: "TARJETA", key: "tarjeta" },
  { label: "EFECTIVO", key: "efectivo" },
  { label: "TOTAL", key: "tota" },
];

const PayrollTable: React.FC<Props> = ({ selectedWeek, selectedYear }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processed = await getProcessedEmployees(selectedWeek, selectedYear);
        setEmployees(processed);
      } catch {
        setEmployees([]);
      }
    };
    fetchData();
  }, [selectedWeek, selectedYear]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setEmployees(prev => handleInputChangeLogic(prev, id, field, value));
  };

  const { totalTarjeta, totalEfectivo, totalGeneral } = getTotals(employees);

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{ p: 2 }}>
        <table style={{ borderCollapse: "collapse", minWidth: 220, fontSize: 16 }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>TARJETA</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>
                {totalTarjeta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>EFECTIVO</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>
                {totalEfectivo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "4px 12px", fontWeight: 700 }}>TOTAL</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right" }}>$</td>
              <td style={{ border: "1px solid #333", padding: "4px 12px", textAlign: "right", fontWeight: 700 }}>
                {totalGeneral.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <div style={{ padding: 16 }}>
          <CSVLink
            data={employees}
            headers={csvHeaders}
            filename={`nomina-semana-${selectedWeek}-${selectedYear}.csv`}
            className="MuiButton-root MuiButton-contained MuiButton-containedPrimary"
            style={{
              marginBottom: 16,
              textDecoration: "none",
              color: "#fff",
              background: "#1976d2",
              padding: "6px 16px",
              borderRadius: 4,
              display: "inline-block"
            }}
          >
            Exportar a Excel
          </CSVLink>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: "1.1rem", background: "#b3d1ee" }}>Nombre</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Lun</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Mar</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Mie</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Jue</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Vie</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Sab</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Dom</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Total T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Importe de T.E.</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Sueldo</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>INFONAVIT</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>FONACOT</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>TOTAL PERCEPCIONES</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Debe</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Abono</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Restan</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>OTROS</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Bono normal</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>Bono mensual</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>TARJETA</TableCell>
              <TableCell sx={{ background: "#ff4444", color: "#fff", fontWeight: 700 }}>EFECTIVO</TableCell>
              <TableCell sx={{ background: "#b3d1ee" }}>TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.id}>
                <TableCell>{emp.full_name}</TableCell>
                <TableCell>{emp.monday}</TableCell>
                <TableCell>{emp.tuesday}</TableCell>
                <TableCell>{emp.wednesday}</TableCell>
                <TableCell>{emp.thursday}</TableCell>
                <TableCell>{emp.friday}</TableCell>
                <TableCell>{emp.saturday}</TableCell>
                <TableCell>{emp.sunday}</TableCell>
                <TableCell>{emp.total_te}</TableCell>
                <TableCell>{emp.importe_te}</TableCell>
                <TableCell>{emp.salario}</TableCell>
                <TableCell>
                  <TextField
                    value={emp.infonavit}
                    onChange={e => handleInputChange(emp.id, "infonavit", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={emp.fonacot}
                    onChange={e => handleInputChange(emp.id, "fonacot", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>{emp.total_percepciones}</TableCell>
                <TableCell>
                  <TextField
                    value={emp.debe}
                    onChange={e => handleInputChange(emp.id, "debe", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={emp.abono}
                    onChange={e => handleInputChange(emp.id, "abono", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>{emp.restan}</TableCell>
                <TableCell>
                  <TextField
                    value={emp.otros}
                    onChange={e => handleInputChange(emp.id, "otros", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={emp.bono_normal}
                    onChange={e => handleInputChange(emp.id, "bono_normal", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={emp.bono_mensual}
                    onChange={e => handleInputChange(emp.id, "bono_mensual", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={emp.tarjeta}
                    onChange={e => handleInputChange(emp.id, "tarjeta", e.target.value)}
                    variant="standard"
                    size="small"
                    type="number"
                    inputProps={{ style: { width: 60 } }}
                  />
                </TableCell>
                <TableCell sx={{ background: "#ff4444", color: "#fff", fontWeight: 700 }}>{emp.efectivo}</TableCell>
                <TableCell>{emp.tota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PayrollTable;