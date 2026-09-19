import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";

export default function UserList() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState([
    { id: 1, username: "admin_bakery", email: "admin@sweets.com", role: "admin", status: "active", created_at: "01/01/2024" },
    { id: 2, username: "tuan_chef", email: "tuan@sweets.com", role: "staff", status: "active", created_at: "10/01/2024" },
    { id: 3, username: "mai_cashier", email: "mai@sweets.com", role: "staff", status: "active", created_at: "15/03/2024" },
    { id: 4, username: "vana_customer", email: "vana@gmail.com", role: "customer", status: "active", created_at: "18/09/2026" },
    { id: 5, username: "spammer123", email: "baduser@spam.com", role: "customer", status: "locked", created_at: "10/08/2026" },
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const created = {
      id: users.length + 1,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      created_at: new Date().toLocaleDateString("vi-VN"),
    };
    setUsers([created, ...users]);
    setShowModal(false);
    setNewUser({ username: "", email: "", password: "", role: "staff" });
    alert(`Đã cấp tài khoản ${newUser.username} (${newUser.role}) thành công!`);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <AdminHeader title="Quản lý tài khoản & Phân quyền" />
      <div className="admin-page-container">
        
        <div className="admin-card" style={{ marginBottom: "20px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, minWidth: "260px" }}>
              <input
                type="text"
                placeholder="Tìm username, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "240px" }}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên (Admin)</option>
                <option value="staff">Nhân viên (Staff)</option>
                <option value="customer">Khách hàng (Customer)</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowModal(true)} className="admin-btn-primary">
                <ion-icon name="person-add-outline"></ion-icon>
                <span>Cấp tài khoản mới</span>
              </button>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên người dùng (user_name)</th>
                  <th>Email</th>
                  <th>Phân quyền (Role)</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td style={{ fontWeight: "600", color: "#1e293b" }}>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "700",
                          background: u.role === "admin" ? "#fef3c7" : u.role === "staff" ? "#e0f2fe" : "#f1f5f9",
                          color: u.role === "admin" ? "#b45309" : u.role === "staff" ? "#0369a1" : "#475569",
                        }}
                      >
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ fontSize: "13px", color: "#64748b" }}>{u.created_at}</td>
                    <td>
                      <span className={`admin-status-pill ${u.status === "active" ? "success" : "danger"}`}>
                        {u.status === "active" ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => {
                          const updated = users.map(item => item.id === u.id ? { ...item, status: item.status === "active" ? "locked" : "active" } : item);
                          setUsers(updated);
                        }}
                        className={u.status === "active" ? "admin-btn-cancel" : "admin-btn-accept"}
                        style={{ padding: "5px 12px", fontSize: "12px" }}
                      >
                        {u.status === "active" ? "Khóa" : "Mở khóa"}
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

      {/* Modal Cấp tài khoản mới */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#fff", borderRadius: "14px", padding: "30px", width: "100%", maxWidth: "460px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" }}>Cấp tài khoản người dùng mới</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>&times;</button>
            </div>

            <form onSubmit={handleCreateAccount} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Tên đăng nhập (user_name) *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: nhanvien_bep"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Email *</label>
                <input
                  type="email"
                  required
                  placeholder="VD: nhanvien@sweets.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Mật khẩu ban đầu *</label>
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Vai trò (Role) *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                >
                  <option value="staff">Nhân viên (Staff)</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                  <option value="customer">Khách hàng (Customer)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {/* Accept Button: Xanh lá */}
                <button type="submit" className="admin-btn-accept" style={{ flex: 1, justifyContent: "center" }}>
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  Tạo tài khoản
                </button>

                {/* Cancel Button: Đỏ */}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="admin-btn-cancel"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
