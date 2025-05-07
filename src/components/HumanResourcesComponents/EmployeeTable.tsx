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
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import EmployeeDocumentsDialog from "./EmployeeDocuments/EmployeeDocumentsDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import { SelectChangeEvent } from "@mui/material";

interface Employee {
  id?: number;
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string;
  salary: number;
  hire_date: string;
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  
  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
      setStatusFilter(event.target.value);
  };

  const handleDocumentClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    setDocumentDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, employee: Employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEdit = () => {
    console.log("Editar empleado:", selectedEmployee);
    handleMenuClose();
  };

  const handleDeactivate = () => {
    console.log("Dar de baja empleado:", selectedEmployee);
    handleMenuClose();
  };

  // Filtrar empleados por búsqueda y estatus
  const filteredAndSearchedEmployees = filteredEmployees.filter((employee) => {
    const fullName = `${employee.first_name} ${employee.second_name} ${employee.last_name_paterno} ${employee.last_name_materno}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "active" && employee.status) || (statusFilter === "inactive" && !employee.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: "#F1F5F9",
      }}
    >
      {/* Buscador y Filtros */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "60%" }}
        />
        <FormControl size="small" sx={{ width: "35%" }}>
          <InputLabel id="status-filter-label">Filtrar por estatus</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Filtrar por estatus"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="active">Activos</MenuItem>
            <MenuItem value="inactive">Inactivos</MenuItem>
          </Select>
        </FormControl>
      </div>

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
                Información
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
            {filteredAndSearchedEmployees
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
                      alt={employee.first_name}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                      {employee.first_name} {employee.second_name} {employee.last_name_paterno}{" "}
                      {employee.last_name_materno}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#475569" }}>
                      {employee.work_area_id}
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
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, employee)}>
                      <MoreVertIcon sx={{ color: "#1E3A8A" }} />
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
        count={filteredAndSearchedEmployees.length}
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
        employeeId={selectedEmployee?.id}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDeactivate}>Dar de Baja</MenuItem>
      </Menu>
    </Paper>
  );
};

export default EmployeeTable;