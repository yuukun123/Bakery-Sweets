import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", label: "Tổng quan", icon: "grid-outline", end: true },
    { to: "/admin/products", label: "Quản lý sản phẩm", icon: "fast-food-outline" },
    { to: "/admin/orders", label: "Quản lý đơn hàng", icon: "receipt-outline" },
    { to: "/admin/employees", label: "Quản lý nhân sự", icon: "id-card-outline" },
    { to: "/admin/users", label: "Tài khoản & Phân quyền", icon: "people-outline" },
    { to: "/admin/statistical", label: "Báo cáo thống kê", icon: "bar-chart-outline" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="brand-logo-wrap">
          <img src="/assets/Img/Sweets1.png" alt="The Sweets" className="admin-brand-img" />
        </div>
        <span className="admin-badge">Admin Panel</span>
      </div>

      <nav className="admin-nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "admin-nav-item active" : "admin-nav-item"
            }
          >
            <ion-icon name={item.icon}></ion-icon>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/" className="admin-footer-link" target="_blank" title="Xem cửa hàng khách hàng">
          <ion-icon name="storefront-outline"></ion-icon>
          <span>Xem Website</span>
        </Link>
        <button onClick={handleLogout} className="admin-logout-btn">
          <ion-icon name="log-out-outline"></ion-icon>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
