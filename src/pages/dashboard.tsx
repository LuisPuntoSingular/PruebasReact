import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/GlobalApis/AuthContext"; // Conecta con el AuthContext

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Usa el AuthContext
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
    </div>
  );
};

export default Dashboard;