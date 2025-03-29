import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode; // Contenido de la página
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />
      <main style={{ padding: "16px" }}>{children}</main>
    </>
  );
}