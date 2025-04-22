import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; // Conecta con el AuthContext

const Dashboard: React.FC = () => {
  const { isAuthenticated, handleLogout } = useAuth(); // Usa el AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Evita mostrar el contenido mientras redirige
  }

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button
        onClick={handleLogout} // Usa handleLogout del AuthContext
        style={{
          padding: "10px 15px",
          backgroundColor: "#FF0000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;