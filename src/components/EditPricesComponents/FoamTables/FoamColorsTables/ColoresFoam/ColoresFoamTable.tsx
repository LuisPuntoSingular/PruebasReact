import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useColoresFoam } from "./useColoresFoam";

type ColoresFoam = {
  id: number;
  color: string;
  anchoplaca: string;
  largoplaca: string;
};

const ColoresFoamTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<ColoresFoam | null>(null);
  const [columns] = useState<(keyof ColoresFoam)[]>(["id", "color", "anchoplaca", "largoplaca"]);
  const {
 
    data,
    formData,
    isEditing,
    handleInputChange,
    openDialog,
    createRecord,
    updateRecord,
    deleteRecord,
  
  } = useColoresFoam();

  const handleCreate = () => {
    if (validateForm()) {
      createRecord(formData);
      setOpenModal(false);
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      updateRecord(formData);
      setOpenModal(false);
    }
  };

  const handleDelete = (row: ColoresFoam) => {
    setOpenConfirmDialog(true);
    setSelectedRow(row);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteRecord(selectedRow);
      setOpenConfirmDialog(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.color) newErrors.color = "Campo obligatorio";
    if (!formData.anchoplaca) newErrors.anchoplaca = "Campo obligatorio";
    if (!formData.largoplaca) newErrors.largoplaca = "Campo obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            openDialog();
            setOpenModal(true);
          }}
          sx={{
            position: "absolute",
            top: "-40px",
            right: "16px",
            zIndex: 1,
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
          onEdit={(row: ColoresFoam) => {
            openDialog(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Editar Color de Foam" : "Agregar Nuevo Color de Foam"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Color"
            name="color"
            value={formData.color || ""}
            onChange={handleInputChange}
            error={!!errors.color}
            helperText={errors.color}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Ancho Placa"
            name="anchoplaca"
            value={formData.anchoplaca || ""}
            onChange={handleInputChange}
            error={!!errors.anchoplaca}
            helperText={errors.anchoplaca}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Largo Placa"
            name="largoplaca"
            value={formData.largoplaca || ""}
            onChange={handleInputChange}
            error={!!errors.largoplaca}
            helperText={errors.largoplaca}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={isEditing ? handleUpdate : handleCreate} color="primary">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmación */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este color de Foam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ColoresFoamTable;