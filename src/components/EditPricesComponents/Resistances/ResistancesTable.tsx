import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useResistances } from "./useResistances";

interface Resistance {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  ect: string;
  flute: string;
  resistances: string;
  pricem2: number;
  minimum: number;
  trim: number;
  categoryid: number;
}

const ResistancesTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<Resistance | null>(null); // Cambiar `any` a `Resistance | null`
  const {
    columns,
    data,
    formData,
    isEditing,
    handleInputChange,
    openDialog,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useResistances();

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

  const handleDelete = (row: Resistance) => {
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
    if (!formData.ect) newErrors.ect = "Campo obligatorio";
    if (!formData.flute) newErrors.flute = "Campo obligatorio";
    if (!formData.resistances) newErrors.resistances = "Campo obligatorio";
    if (!formData.pricem2) newErrors.pricem2 = "Campo obligatorio";
    if (!formData.minimum) newErrors.minimum = "Campo obligatorio";
    if (!formData.trim) newErrors.trim = "Campo obligatorio";
    if (!formData.categoryid) newErrors.categoryid = "Campo obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div style={{ position: "relative", paddingTop: "40px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            openDialog();
            setOpenModal(true);
          }}
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
          onEdit={(row: Resistance) => {
            openDialog(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Editar Resistencia" : "Agregar Nueva Resistencia"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ECT"
            name="ect"
            value={formData.ect || ""}
            onChange={handleInputChange}
            error={!!errors.ect}
            helperText={errors.ect}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Flute"
            name="flute"
            value={formData.flute || ""}
            onChange={handleInputChange}
            error={!!errors.flute}
            helperText={errors.flute}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Resistances"
            name="resistances"
            value={formData.resistances || ""}
            onChange={handleInputChange}
            error={!!errors.resistances}
            helperText={errors.resistances}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Precio por m2"
            name="pricem2"
            value={formData.pricem2 || ""}
            onChange={handleInputChange}
            error={!!errors.pricem2}
            helperText={errors.pricem2}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mínimo"
            name="minimum"
            value={formData.minimum || ""}
            onChange={handleInputChange}
            error={!!errors.minimum}
            helperText={errors.minimum}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Trim"
            name="trim"
            value={formData.trim || ""}
            onChange={handleInputChange}
            error={!!errors.trim}
            helperText={errors.trim}
            fullWidth
          />
          <TextField
            margin="dense"
            label="ID Categoría"
            name="categoryid"
            value={formData.categoryid || ""}
            onChange={handleInputChange}
            error={!!errors.categoryid}
            helperText={errors.categoryid}
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
          <Typography>¿Estás seguro de que deseas eliminar esta resistencia?</Typography>
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

export default ResistancesTable;