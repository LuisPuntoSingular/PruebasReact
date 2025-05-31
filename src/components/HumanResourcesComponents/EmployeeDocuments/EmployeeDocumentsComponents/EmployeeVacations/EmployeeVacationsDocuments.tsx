import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
} from "@mui/material";

const EmployeeVacationsContent: React.FC = () => {
  // Años trabajados y días de vacaciones por año
 
  const vacationDaysByYear = [
    { year: 2023, days: 12 },
    { year: 2024, days: 14 },
    { year: 2025, days: 16 },
    { year: 2026, days: 18 },
    { year: 2027, days: 20 },
  ];

  // Estado para registrar nuevas solicitudes de vacaciones
  const [newRequest, setNewRequest] = useState<{ year: number; startDate: string; days: number }>({
    year: new Date().getFullYear(),
    startDate: "",
    days: 0,
  });

  // Estado para almacenar el historial de solicitudes
  const [vacationRequests, setVacationRequests] = useState<
    { year: number; requestDate: string; startDate: string; endDate: string; days: number; approved: boolean }[]
  >([]);

  // Manejar el cambio en los campos de entrada
  const handleInputChange = (field: keyof typeof newRequest, value: string | number) => {
    setNewRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Registrar una nueva solicitud de vacaciones
  const handleRequestVacation = () => {
    const today = new Date();
    const requestDate = today.toISOString().split("T")[0]; // Fecha de solicitud (hoy)
    const startDate = new Date(newRequest.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + newRequest.days - 1); // Calcular la fecha de fin

    // Agregar la solicitud al historial
    setVacationRequests((prev) => [
      ...prev,
      {

        year: newRequest.year,
        requestDate,
        startDate: newRequest.startDate,
        endDate: endDate.toISOString().split("T")[0],
        days: newRequest.days,
        approved: false, // Por defecto, no aprobada
        
      },
    ]);

    // Reiniciar el formulario
    setNewRequest({ year: new Date().getFullYear(), startDate: "", days: 0 });
  };

  // Validar si la fecha de inicio es al menos 15 días después de hoy
  const isStartDateValid = () => {
    if (!newRequest.startDate) return false;
    const today = new Date();
    const minStartDate = new Date(today);
    minStartDate.setDate(today.getDate() + 15); // Fecha mínima: 15 días después de hoy
    const startDate = new Date(newRequest.startDate);
    return startDate >= minStartDate;
  };

  // Calcular los días restantes por año
  const remainingDaysByYear = vacationDaysByYear.map((yearData) => {
    const usedDays = vacationRequests
      .filter((request) => request.year === yearData.year)
      .reduce((acc, request) => acc + request.days, 0);
    return {
      year: yearData.year,
      totalDays: yearData.days,
      remainingDays: yearData.days - usedDays,
    };
  });

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF", // Fondo blanco
        color: "#1F2937", // Texto oscuro
        borderRadius: "12px",
        padding: "16px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra sutil
        margin: "0 auto",
      }}
    >
      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          color: "#1E3A8A", // Azul oscuro
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        Control de Vacaciones
      </Typography>

      {/* Lista de Vacaciones por Año */}
      <List>
        {remainingDaysByYear.map((yearData, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "8px 0",
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1E3A8A",
                    }}
                  >
                    Año {yearData.year}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Días disponibles: <strong>{yearData.remainingDays}</strong> / {yearData.totalDays}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                      }}
                    >
                      Historial:
                    </Typography>
                    {vacationRequests
                      .filter((request) => request.year === yearData.year)
                      .map((request, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            color: request.approved ? "#10B981" : "#EF4444",
                            fontStyle: "italic",
                          }}
                        >
                          {request.startDate} - {request.endDate} ({request.days} días) -{" "}
                          {request.approved ? "Aprobada" : "Pendiente"}
                        </Typography>
                      ))}
                  </>
                }
              />
            </ListItem>
            {index < remainingDaysByYear.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <Divider sx={{ margin: "16px 0" }} />

      {/* Formulario para Solicitar Vacaciones */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          color: "#1E3A8A",
          marginBottom: "8px",
        }}
      >
        Registrar Solicitud
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        <TextField
          label="Año"
          type="number"
          value={newRequest.year}
          onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Fecha de inicio"
          type="date"
          value={newRequest.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          sx={{ width: "100%" }}
          InputLabelProps={{
            shrink: true,
          }}
          error={!isStartDateValid() && newRequest.startDate !== ""}
          helperText={
            !isStartDateValid() && newRequest.startDate !== ""
              ? "La fecha de inicio debe ser al menos 15 días después de hoy."
              : ""
          }
        />
        <TextField
          label="Días solicitados"
          type="number"
          value={newRequest.days}
          onChange={(e) => handleInputChange("days", parseInt(e.target.value))}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handleRequestVacation}
          disabled={!isStartDateValid() || newRequest.days <= 0}
          sx={{
            backgroundColor: "#1E3A8A",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#2563EB",
            },
            textTransform: "none",
          }}
        >
          Solicitar Vacaciones
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeVacationsContent;