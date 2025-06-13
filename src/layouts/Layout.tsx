import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Header onMenuClick={handleMenuClick} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />
      <main style={{ padding: 16 }}>{children}</main>
    </div>
  );
}