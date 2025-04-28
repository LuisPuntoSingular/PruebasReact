import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import EmployeeDocumentsDialog from "./EmployeeDocumentsDialog";

interface Employee {
  id?: number;
  name: string;
  last_name_paterno: string;
  last_name_materno: string;
  position: string;
  salary: number;
  hire_date: string;
  phone_number?: string;
  emergency_contact?: string;
  
  status: boolean;
}

interface EmployeeTableProps {
  filteredEmployees: Employee[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmployeeSelect: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  filteredEmployees,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEmployeeSelect,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);

  const handleDocumentClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    setDocumentDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: "#F1F5F9",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1E293B",
              }}
            >
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Foto
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Puesto
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Salario
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Estatus
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Documentos
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{
                    backgroundColor: "#F8FAFC",
                    "&:hover": {
                      backgroundColor: "#E2E8F0",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={"https://via.placeholder.com/40?text=Avatar"}
                      alt={employee.name}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                      {employee.name} {employee.last_name_paterno}{" "}
                      {employee.last_name_materno}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#475569" }}>
                      {employee.position}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#475569" }}>
                      ${employee.salary.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: employee.status ? "#10B981" : "#EF4444",
                        fontWeight: "500",
                      }}
                    >
                      {employee.status ? "Activo" : "Inactivo"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDocumentClick(employee)}>
                      <DescriptionIcon sx={{ color: "#1E3A8A" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEmployeeSelect(employee)}>
                      <InfoIcon sx={{ color: "#1E3A8A" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#475569",
          },
          "& .MuiTablePagination-actions": {
            color: "#475569",
          },
        }}
      />
      <EmployeeDocumentsDialog
        open={documentDialogOpen}
        onClose={handleDocumentDialogClose}
        employee={selectedEmployee} // Pass the employee object or null
      />
    </Paper>
  );
};

export default EmployeeTable;