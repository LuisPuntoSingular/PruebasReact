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
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Image from "next/image"; // Importar el componente Image de Next.js

interface Employee {
  id?: number; // Opcional si no está presente al crear un nuevo empleado
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
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Foto
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Puesto
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Salario
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Estatus
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold", fontSize: { xs: "12px", sm: "14px" } }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Image
                      src={employee.photo}
                      alt={employee.name}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontSize: { xs: "12px", sm: "14px" } }}>
                    {employee.name} {employee.last_name_paterno} {employee.last_name_materno}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontSize: { xs: "12px", sm: "14px" } }}>
                    {employee.position}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontSize: { xs: "12px", sm: "14px" } }}>
                    {employee.salary}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: employee.status ? "#3B82F6" : "#EF4444",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                  >
                    {employee.status ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEmployeeSelect(employee)}>
                      <InfoIcon sx={{ color: "#ffffff" }} />
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
          color: "#ffffff",
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#ffffff",
          },
        }}
      />
    </>
  );
};

export default EmployeeTable;