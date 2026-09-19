import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [employees] = useState([
    {
      id: 1,
      code: "NV001",
      name: "Nguyễn Minh Tuấn",
      phone: "0912345671",
      citizen_id: "079201001234",
      department: "Bếp Bánh (Kitchen)",
      position: "Bếp Trưởng",
      contract: "Full-time",
      hire_date: "10/01/2024",
      user_name: "tuan_chef",
      role: "staff",
      status: "Active",
    },
    {
      id: 2,
      code: "NV002",
      name: "Trần Thị Mai",
      phone: "0912345672",
      citizen_id: "079202005678",
      department: "Thu Ngân & Bán Hàng",
      position: "Trưởng Ca Thu Ngân",
      contract: "Full-time",
      hire_date: "15/03/2024",
      user_name: "mai_cashier",
      role: "staff",
      status: "Active",
    },
    {
      id: 3,
      code: "NV003",
      name: "Lê Hoàng Phúc",
      phone: "0912345673",
      citizen_id: "079203009999",
      department: "Bếp Bánh (Kitchen)",
      position: "Phụ Bếp Bánh",
      contract: "Probation",
      hire_date: "01/09/2026",
      user_name: "phuc_bakery",
      role: "staff",
      status: "Active",
    },
    {
      id: 4,
      code: "NV004",
      name: "Phạm Hồng Ánh",
      phone: "0912345674",
      citizen_id: "079204008888",
      department: "Thu Ngân & Bán Hàng",
      position: "Nhân Viên Bán Hàng",
      contract: "Part-time",
      hire_date: "20/05/2025",
      user_name: null,
      role: null,
      status: "On Leave",
    },
  ]);

  const filteredEmployees = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm);
    const matchesDept = deptFilter === "all" || e.department.includes(deptFilter);
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <>
      <AdminHeader title="Quản lý nhân sự & Hồ sơ nhân viên" />
      <div className="admin-page-container">
        
        {/* Quick Stats Banner */}
        <div className="admin-grid-3" style={{ marginBottom: "20px" }}>
          <div className="admin-card" style={{ padding: "16px 20px", margin: 0, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Tổng nhân sự</span>
              <h4 style={{ margin: "2px 0 0", fontSize: "18px", color: "#1e293b" }}>{employees.length} nhân viên</h4>
            </div>
          </div>

          <div className="admin-card" style={{ padding: "16px 20px", margin: 0, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#ecfdf5", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              <ion-icon name="checkmark-done-circle-outline"></ion-icon>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Đang làm việc</span>
              <h4 style={{ margin: "2px 0 0", fontSize: "18px", color: "#10b981" }}>
                {employees.filter(e => e.status === "Active").length} nhân viên
              </h4>
            </div>
          </div>

          <div className="admin-card" style={{ padding: "16px 20px", margin: 0, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              <ion-icon name="time-outline"></ion-icon>
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Thử việc / Nghỉ phép</span>
              <h4 style={{ margin: "2px 0 0", fontSize: "18px", color: "#d97706" }}>
                {employees.filter(e => e.status !== "Active" || e.contract === "Probation").length} nhân viên
              </h4>
            </div>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="admin-card" style={{ marginBottom: "20px", padding: "16px 20px" }}>
          <div className="admin-toolbar" style={{ margin: 0 }}>
            
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
              <input
                type="text"
                placeholder="Tìm tên, mã NV, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", minWidth: "220px" }}
              />
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="all">Tất cả phòng ban</option>
                <option value="Bếp Bánh">Bếp Bánh</option>
                <option value="Thu Ngân">Thu Ngân & Bán Hàng</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Active">Đang làm việc</option>
                <option value="On Leave">Nghỉ phép</option>
                <option value="Resigned">Đã thôi việc</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/admin/employees/add" className="admin-btn-primary">
                <ion-icon name="person-add-outline"></ion-icon>
                <span>Tạo hồ sơ nhân viên</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Employee Table */}
        <div className="admin-card">
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã NV</th>
                  <th>Họ và Tên</th>
                  <th>Phòng ban & Chức vụ</th>
                  <th>Số điện thoại</th>
                  <th>CCCD / CMND</th>
                  <th>Hợp đồng</th>
                  <th>Tài khoản đăng nhập</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: "700", color: "#1e293b" }}>{e.code}</td>
                    <td>
                      <div style={{ fontWeight: "600", color: "#1e293b" }}>{e.name}</div>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Vào làm: {e.hire_date}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: "500" }}>{e.position}</div>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{e.department}</span>
                    </td>
                    <td>{e.phone}</td>
                    <td>{e.citizen_id}</td>
                    <td><span className="admin-status-pill warning" style={{ fontSize: "11px" }}>{e.contract}</span></td>
                    <td>
                      {e.user_name ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>
                          <ion-icon name="shield-checkmark-outline" style={{ color: "#10b981" }}></ion-icon>
                          {e.user_name}
                        </span>
                      ) : (
                        <Link
                          to={`/admin/employees/edit/${e.id}?tab=account`}
                          style={{ fontSize: "12px", color: "#1e293b", textDecoration: "none", fontWeight: "600", borderBottom: "1px dashed #1e293b" }}
                        >
                          + Cấp tài khoản
                        </Link>
                      )}
                    </td>
                    <td>
                      <span className={`admin-status-pill ${e.status === "Active" ? "success" : "warning"}`}>
                        {e.status === "Active" ? "Đang làm" : e.status === "On Leave" ? "Nghỉ phép" : "Nghỉ việc"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link
                        to={`/admin/employees/edit/${e.id}`}
                        className="admin-btn-default"
                        style={{ padding: "5px 10px", fontSize: "12px", marginRight: "6px" }}
                      >
                        <ion-icon name="create-outline"></ion-icon> Sửa
                      </Link>
                      <button
                        onClick={() => alert(`Khóa hồ sơ nhân viên ${e.code}`)}
                        className="admin-btn-cancel"
                        style={{ padding: "5px 10px", fontSize: "12px" }}
                        title="Khóa hồ sơ"
                      >
                        <ion-icon name="lock-closed-outline"></ion-icon> Khóa
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
