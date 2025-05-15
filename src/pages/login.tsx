import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { useAuth } from "@/context/GlobalApis/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { login } = useAuth(); // Usa la función login del contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Llama a la función login del contexto
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message || "Error al iniciar sesión");
      } else {
        setLocalError("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #0d1117, #161b22)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.5)",
          borderRadius: "16px",
          backgroundColor: "#1e272e",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#f39c12",
                width: 56,
                height: 56,
              }}
            >
              <BusinessIcon fontSize="large" />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#f1f1f1",
                textTransform: "uppercase",
              }}
            >
              Autopack
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#a5a5a5",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              Soluciones en empaques de cartón
            </Typography>
            {localError && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                {localError}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { color: "#f1f1f1" },
                }}
                InputLabelProps={{
                  style: { color: "#a5a5a5" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#555",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f39c12",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f39c12",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: "#f1f1f1" },
                }}
                InputLabelProps={{
                  style: { color: "#a5a5a5" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#555",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f39c12",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f39c12",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#f39c12",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d68910",
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;