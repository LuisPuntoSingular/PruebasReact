import React, { useState, useEffect } from "react";
import {
  Table,
  Box,
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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import EmployeeDocumentsDialog from "./EmployeeDocuments/EmployeeDocumentsDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import { SelectChangeEvent } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface Employee {
  id?: number;
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string;
  salary: number | string;
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
  const [orderById, setOrderById] = useState<"asc" | "desc">("asc");
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

    useEffect(() => {
    onPageChange({}, 0);
  }, [searchTerm, statusFilter, filteredEmployees.length]);



  const handleDeactivate = () => {
    console.log("Dar de baja empleado:", selectedEmployee);
    handleMenuClose();
  };

const sortEmployeesById = (employees: Employee[]) => {
  return employees.sort((a, b) => {
    if (orderById === "asc") {
      return a.id! - b.id!;
    } else {
      return b.id! - a.id!;
    }
  });
};


  // Filtrar empleados por búsqueda y estatus
 const filteredAndSearchedEmployees = sortEmployeesById(
  filteredEmployees.filter((employee) => {
    const fullName = `${employee.first_name} ${employee.second_name} ${employee.last_name_paterno} ${employee.last_name_materno}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "active" && employee.status) || (statusFilter === "inactive" && !employee.status);
    return matchesSearch && matchesStatus;
  })
);

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
    display: "flex",
    alignItems: "center",
  }}
>
  ID
  <IconButton
    onClick={() => setOrderById(orderById === "asc" ? "desc" : "asc")}
    sx={{ color: "#FFFFFF", marginLeft: "8px" }}
  >
    {orderById === "asc" ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
  </IconButton>
</TableCell>
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
                    <Typography variant="body2" sx={{ color: "#475569" }}>
                      {employee.id}
                    </Typography>
                  </TableCell>
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
  labelRowsPerPage="Mostrar:"
  labelDisplayedRows={({ from, to, count }) =>
    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
  }
  nextIconButtonProps={{
    style: { color: "#1E3A8A" }
  }}
  backIconButtonProps={{
    style: { color: "#1E3A8A" }
  }}
  sx={{
    mt: 2,
    borderRadius: 2,
    background: "#F8FAFC",
    boxShadow: "0 2px 8px 0 rgba(30,41,59,0.04)",
    "& .MuiTablePagination-toolbar": {
      minHeight: 48,
      paddingLeft: 2,
      paddingRight: 2,
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
      color: "#334155",
      fontWeight: 500,
      fontSize: 15,
    },
    "& .MuiTablePagination-actions": {
      color: "#1E3A8A",
    },
    "& .MuiInputBase-root": {
      borderRadius: 2,
      background: "#fff",
      fontWeight: 500,
    },
  }}
  ActionsComponent={(subprops) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={(event) => subprops.onPageChange(event, subprops.page - 1)}
        disabled={subprops.page === 0}
        aria-label="Página anterior"
        size="small"
        sx={{ color: "#1E3A8A" }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={(event) => subprops.onPageChange(event, subprops.page + 1)}
        disabled={subprops.page >= Math.ceil(subprops.count / subprops.rowsPerPage) - 1}
        aria-label="Página siguiente"
        size="small"
        sx={{ color: "#1E3A8A" }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  )}
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
        
        <MenuItem onClick={handleDeactivate}>Dar de Baja</MenuItem>
      </Menu>
    </Paper>
  );
};

export default EmployeeTable;