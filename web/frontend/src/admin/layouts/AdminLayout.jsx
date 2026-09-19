import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
}
