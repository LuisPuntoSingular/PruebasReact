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
import { useRouter } from "next/router";

interface LoginProps {
  onLogin: (token: string) => void; // Función para manejar el inicio de sesión
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend para iniciar sesión
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const { token } = await response.json();

      // Llama a la función onLogin para manejar el token
      onLogin(token);

      // Redirige al dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setLocalError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #0d1117, #161b22)", // Fondo oscuro con degradado
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.5)", // Sombra para destacar la card
          borderRadius: "16px",
          backgroundColor: "#1e272e", // Fondo oscuro del card
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
                bgcolor: "#f39c12", // Color dorado para el avatar
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
                color: "#f1f1f1", // Texto claro
                textTransform: "uppercase",
              }}
            >
              Autopack
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#a5a5a5", // Texto gris claro
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
                  style: { color: "#f1f1f1" }, // Texto blanco
                }}
                InputLabelProps={{
                  style: { color: "#a5a5a5" }, // Etiqueta gris claro
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#555", // Borde gris oscuro
                    },
                    "&:hover fieldset": {
                      borderColor: "#f39c12", // Borde dorado al pasar el cursor
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f39c12", // Borde dorado al enfocar
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
                  style: { color: "#f1f1f1" }, // Texto blanco
                }}
                InputLabelProps={{
                  style: { color: "#a5a5a5" }, // Etiqueta gris claro
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#555", // Borde gris oscuro
                    },
                    "&:hover fieldset": {
                      borderColor: "#f39c12", // Borde dorado al pasar el cursor
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#f39c12", // Borde dorado al enfocar
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
                  backgroundColor: "#f39c12", // Botón dorado
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d68910", // Botón dorado más oscuro al pasar el cursor
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