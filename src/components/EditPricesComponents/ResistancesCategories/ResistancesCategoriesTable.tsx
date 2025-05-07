import React, { useState, useEffect } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import axios from "axios";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ResistanceCategory {
  id: number;
  name: string;
  description: string;
}

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/resistancescategories`;

const ResistancesCategoriesTable: React.FC = () => {
  const [columns, setColumns] = useState<(keyof ResistanceCategory)[]>([]);
  const [data, setData] = useState<ResistanceCategory[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<ResistanceCategory[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]) as (keyof ResistanceCategory)[]);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row: ResistanceCategory) => {
    console.log("Editar:", row);
  };

  const handleDelete = (row: ResistanceCategory) => {
    console.log("Eliminar:", row);
  };

  const handleAdd = () => {
    console.log("Agregar nuevo registro");
  };

  return (
    <div style={{ position: "relative", paddingTop: "40px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{
          position: "absolute",
          top: "0", // Posición en la parte superior del contenedor
          right: "16px", // Alineado a la derecha
          zIndex: 1,
          backgroundColor: "#1E88E5",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1565C0",
          },
        }}
      >
        <AddIcon />
      </Button>
      <BaseTable
        columns={columns}
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ResistancesCategoriesTable;