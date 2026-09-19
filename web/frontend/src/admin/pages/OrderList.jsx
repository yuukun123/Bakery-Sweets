import { useState } from "react";
import AdminHeader from "../components/AdminHeader";

export default function OrderList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [orders] = useState([
    { id: "HD001", customer: "Nguyen Van A", phone: "0901234567", address: "123 Le Loi, Q.1, HCM", date: "19/09/2026 10:30", items: "2x Chocolate Mousse, 1x Peach Tea", total: "120,000 đ", status: "Hoàn thành", badge: "success" },
    { id: "HD002", customer: "Tran Thi B", phone: "0912345678", address: "45 Nguyen Hue, Q.1, HCM", date: "19/09/2026 11:15", items: "3x Butter Croissant", total: "105,000 đ", status: "Đang giao", badge: "warning" },
    { id: "HD003", customer: "Le Van C", phone: "0987654321", address: "88 Hai Ba Trung, Q.3, HCM", date: "19/09/2026 11:45", items: "1x Matcha Cake", total: "55,000 đ", status: "Chờ xử lý", badge: "danger" },
  ]);

  return (
    <>
      <AdminHeader title="Quản lý đơn hàng (Receipts)" />
      <div className="admin-page-container">
        
        <div className="admin-card">
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Món đã đặt</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: "700", color: "#1e293b" }}>{o.id}</td>
                    <td style={{ fontWeight: "600" }}>{o.customer}</td>
                    <td>{o.phone}</td>
                    <td style={{ fontSize: "13px", color: "#64748b" }}>{o.items}</td>
                    <td style={{ fontWeight: "700", color: "#1e293b" }}>{o.total}</td>
                    <td style={{ fontSize: "12px" }}>{o.date}</td>
                    <td><span className={`admin-status-pill ${o.badge}`}>{o.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => alert(`Xem chi tiết đơn ${o.id}`)}
                        className="admin-btn-default"
                        style={{ padding: "5px 12px", fontSize: "12px" }}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phân trang chuẩn màu như hình */}
          <div className="admin-pagination">
            <button
              className="admin-page-arrow"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              &larr; Trước
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className={`admin-page-btn ${currentPage === num ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              className="admin-page-arrow"
              disabled={currentPage === 3}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
            >
              Sau &rarr;
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
