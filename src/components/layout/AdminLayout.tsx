import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: integrate with Supabase auth
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar onLogout={handleLogout} />
      <main className="lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
