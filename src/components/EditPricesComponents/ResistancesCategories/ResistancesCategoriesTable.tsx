import React, { useState, useEffect } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import axios from "axios";

interface ResistanceCategory {
  id: number;
  name: string;
  description: string;
}

const ResistancesCategoriesTable: React.FC = () => {
  const [columns, setColumns] = useState<(keyof ResistanceCategory)[]>([]);
  const [data, setData] = useState<ResistanceCategory[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<ResistanceCategory[]>(
          "https://backnode-production.up.railway.app/api/resistancescategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  return (
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
  );
};

export default ResistancesCategoriesTable;