import React from "react";
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

interface Employee {
  id?: number;
  photo: string;
  name: string;
  last_name_paterno: string;
  last_name_materno: string;
  position: string;
  salary: number;
  hire_date: string;
  phone_number?: string;
  emergency_contact?: string;
  nss: boolean;
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
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        borderRadius: "12px", // Bordes suaves
        backgroundColor: "#F1F5F9", // Fondo gris claro para el contenedor
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1E293B", // Fondo azul marino para encabezados
              }}
            >
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Foto
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Puesto
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Salario
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none",
                }}
              >
                Estatus
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF", // Texto blanco
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
                    backgroundColor: "#F8FAFC", // Fondo gris claro para filas
                    "&:hover": {
                      backgroundColor: "#E2E8F0", // Fondo más oscuro en hover
                    },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={
                        employee.photo ||
                        "https://via.placeholder.com/40?text=Avatar" // Avatar genérico
                      }
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
                        color: employee.status ? "#10B981" : "#EF4444", // Verde para activo, rojo para inactivo
                        fontWeight: "500",
                      }}
                    >
                      {employee.status ? "Activo" : "Inactivo"}
                    </Typography>
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
            color: "#475569", // Texto gris oscuro
          },
          "& .MuiTablePagination-actions": {
            color: "#475569", // Iconos gris oscuro
          },
        }}
      />
    </Paper>
  );
};

export default EmployeeTable;