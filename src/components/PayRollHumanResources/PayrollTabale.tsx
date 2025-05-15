import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box
} from "@mui/material";
import { fetchPayroll, getEmployeeSalaryById } from "./payRollHumanResourcesService";
import { CSVLink } from "react-csv";

interface Props {
  selectedWeek: number;
  selectedYear: number;
}
interface Employee {
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
    const getPayroll = async () => {
      try {
        const data = await fetchPayroll(selectedWeek, selectedYear);
  
        const employeesMap: { [key: number]: Employee } = {};
        for (const rec of data) {
          const empId = rec.employee_id;
          if (!employeesMap[empId]) {
            let salario = rec.salario ?? 0;
            if (!salario) {
              try {
                const salaryData = await getEmployeeSalaryById(empId);
                salario = salaryData.salary;
              } catch {
                salario = 0;
              }
            }
            employeesMap[empId] = {
              id: empId,
              full_name: `${rec.first_name ?? ""} ${rec.last_name_paterno ?? ""}`,
              salario,
              monday: "",
              tuesday: "",
              wednesday: "",
              thursday: "",
              friday: "",
              saturday: "",
              sunday: "",
              total_te: 0,
              importe_te: 0,
            
              infonavit: "",
              fonacot: "",
              total_percepciones: 0,
              debe: "",
              abono: "",
              restan: 0,
              otros: "",
              bono_normal: "",
              bono_mensual: "",
              tarjeta: "",
              efectivo: 0,
              tota: 0,
            };
          }
          const dayOfWeek = new Date(rec.date).getDay();
          const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          employeesMap[empId][dayMap[dayOfWeek]] = rec.code;
  
          const overtime = Number(rec.overtime_hours ?? 0);
          employeesMap[empId].total_te += overtime;
        }
  
        Object.values(employeesMap).forEach((emp) => {
          emp.importe_te = emp.total_te * 50;
          emp.total_percepciones =
            Number(emp.importe_te || 0) +
            Number(emp.salario || 0) +
            Number(emp.infonavit || 0) +
            Number(emp.fonacot || 0);
          emp.restan =
            Number(emp.debe || 0) - Number(emp.abono || 0);
  
          emp.tarjeta = (
            Number(emp.total_percepciones || 0) -
            Number(emp.abono || 0) +
            Number(emp.bono_normal || 0) +
            Number(emp.bono_mensual || 0)
          ).toString();
  
          emp.efectivo =
            Number(emp.total_percepciones || 0) -
            (Number(emp.abono || 0) +
              Number(emp.bono_normal || 0) +
              Number(emp.bono_mensual || 0) +
              Number(emp.tarjeta || 0));
  
          emp.tota = Number(emp.tarjeta || 0) + Number(emp.efectivo || 0);
        });
  
        setEmployees(Object.values(employeesMap));
      } catch {
        setEmployees([]);
      }
    };
    getPayroll();
  }, [selectedWeek, selectedYear]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id !== id) return emp;
        const updated = { ...emp, [field]: value };

        // Actualiza restan
        if (field === "debe" || field === "abono") {
          updated.restan =
            Number(updated.debe || 0) - Number(updated.abono || 0);
        }

        // Actualiza total_percepciones
        if (["infonavit", "fonacot", "importe_te", "salario"].includes(field)) {
          updated.total_percepciones =
            Number(updated.importe_te || 0) +
            Number(updated.salario || 0) +
            Number(updated.infonavit || 0) +
            Number(updated.fonacot || 0);
        }

        // Actualiza tarjeta
        if (
          ["total_percepciones", "abono", "bono_normal", "bono_mensual"].includes(field)
        ) {
          updated.tarjeta = (
            Number(updated.total_percepciones || 0) -
            Number(updated.abono || 0) +
            Number(updated.bono_normal || 0) +
            Number(updated.bono_mensual || 0)
          ).toString();
        }

        // Actualiza efectivo
        if (
          ["total_percepciones", "abono", "bono_normal", "bono_mensual", "tarjeta"].includes(field)
        ) {
          updated.efectivo =
            Number(updated.total_percepciones || 0) -
            (Number(updated.abono || 0) +
              Number(updated.bono_normal || 0) +
              Number(updated.bono_mensual || 0) +
              Number(updated.tarjeta || 0));
        }

        // Actualiza total
        if (
          ["tarjeta", "efectivo"].includes(field)
        ) {
          updated.tota = Number(updated.tarjeta || 0) + Number(updated.efectivo || 0);
        }

        return updated;
      })
    );
  };

  // Mini tabla de totales
  const totalTarjeta = employees.reduce((acc, emp) => acc + Number(emp.tarjeta || 0), 0);
  const totalEfectivo = employees.reduce((acc, emp) => acc + Number(emp.efectivo || 0), 0);
  const totalGeneral = totalTarjeta + totalEfectivo;

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