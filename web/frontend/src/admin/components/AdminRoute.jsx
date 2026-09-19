import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function AdminRoute() {
  const { user } = useAuthStore();

  // Kiểm tra nếu chưa đăng nhập hoặc không phải admin -> Đẩy sang trang /admin/login
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
