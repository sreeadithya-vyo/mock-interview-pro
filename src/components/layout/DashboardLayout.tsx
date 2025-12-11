import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleLogout = () => {
    // In real app, this would call logout function
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} user={user} onLogout={handleLogout} />
      <DashboardSidebar />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
