import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data mẫu cho Dashboard (Sau này kết nối API thực tế tại đây)
  const stats = [
    { label: "Doanh thu hôm nay", value: "3,450,000 đ", change: "+12.5%", icon: "cash-outline", color: "#10b981" },
    { label: "Đơn hàng mới", value: "28", change: "+4 đơn", icon: "cart-outline", color: "#3b82f6" },
    { label: "Tổng sản phẩm", value: "42", change: "3 danh mục", icon: "fast-food-outline", color: "#d4845a" },
    { label: "Khách hàng mới", value: "15", change: "+8 tuần này", icon: "people-outline", color: "#8b5cf6" },
  ];

  const recentOrders = [
    { id: "HD001", customer: "Nguyen Van A", phone: "0901234567", date: "19/09/2026", total: "350,000 đ", status: "Hoàn thành", badge: "success" },
    { id: "HD002", customer: "Tran Thi B", phone: "0912345678", date: "19/09/2026", total: "180,000 đ", status: "Đang giao", badge: "warning" },
    { id: "HD003", customer: "Le Van C", phone: "0987654321", date: "19/09/2026", total: "520,000 đ", status: "Chờ xử lý", badge: "danger" },
    { id: "HD004", customer: "Pham Thi D", phone: "0977889900", date: "18/09/2026", total: "260,000 đ", status: "Hoàn thành", badge: "success" },
  ];

  return (
    <>
      <AdminHeader title="Bảng điều khiển (Dashboard)" />
      <div className="admin-page-container">
        
        {/* Stat Cards */}
        <div className="admin-grid-4" style={{ marginBottom: "25px" }}>
          {stats.map((s, idx) => (
            <div key={idx} className="admin-card" style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", margin: 0 }}>
              <div>
                <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>{s.label}</span>
                <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: "6px 0 4px" }}>{s.value}</h3>
                <span style={{ fontSize: "12px", color: s.color, fontWeight: "600" }}>{s.change}</span>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontSize: "24px" }}>
                <ion-icon name={s.icon}></ion-icon>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "700" }}>Đơn hàng gần đây</h3>
              <span style={{ fontSize: "13px", color: "#64748b" }}>Các đơn đặt bánh mới nhất trong ngày</span>
            </div>
            <Link to="/admin/orders" className="admin-btn-primary" style={{ fontSize: "13px", padding: "8px 16px" }}>
              Xem tất cả đơn
            </Link>
          </div>

          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: "600", color: "#d4845a" }}>{o.id}</td>
                    <td style={{ fontWeight: "500" }}>{o.customer}</td>
                    <td>{o.phone}</td>
                    <td>{o.date}</td>
                    <td style={{ fontWeight: "600" }}>{o.total}</td>
                    <td><span className={`admin-status-pill ${o.badge}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
