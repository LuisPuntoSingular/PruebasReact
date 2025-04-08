import { useEffect } from "react";
import { useRouter } from "next/router";

interface DashboardProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isAuthenticated, onLogout }) => {
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
        onClick={onLogout}
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