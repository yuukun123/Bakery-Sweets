import useAuthStore from "../../store/authStore";
import useAdminUIStore from "../../store/adminUIStore";
import "./AdminHeader.css";

export default function AdminHeader({ title = "Quản trị hệ thống" }) {
  const { user } = useAuthStore();
  const { toggleSidebar } = useAdminUIStore();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        {/* Nút Hamburger bật/tắt Sidebar trên Tablet & Mobile */}
        <button 
          className="admin-menu-toggle" 
          onClick={toggleSidebar} 
          aria-label="Mở thanh điều hướng"
          type="button"
        >
          <ion-icon name="menu-outline"></ion-icon>
        </button>

        <div className="admin-header-title">
          <h2>{title}</h2>
          <span className="admin-header-breadcrumb">Trang quản trị &gt; {title}</span>
        </div>
      </div>

      <div className="admin-header-actions">
        <div className="admin-status-badge">
          <span className="pulse-dot"></span>
          <span className="status-text">Hệ thống hoạt động</span>
        </div>

        <div className="admin-user-info">
          <div className="admin-avatar">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <div className="admin-user-details">
            <span className="admin-username">{user?.username || "Admin"}</span>
            <span className="admin-role-tag">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
