import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import useAdminUIStore from "../../store/adminUIStore";
import "./AdminLayout.css";

export default function AdminLayout() {
  const { sidebarOpen, closeSidebar } = useAdminUIStore();

  return (
    <div className={`admin-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Lớp nền mờ (Backdrop overlay) khi mở Sidebar trên Mobile & iPad */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <AdminSidebar />

      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}
