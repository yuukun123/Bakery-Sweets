import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'account'

  // Form State bám sát bảng employees & users trong createTable.sql
  const [formData, setFormData] = useState({
    // Bảng employees
    employee_code: isEdit ? "NV001" : "NV00" + Math.floor(Math.random() * 90 + 10),
    first_name: isEdit ? "Minh Tuấn" : "",
    last_name: isEdit ? "Nguyễn" : "",
    phone: isEdit ? "0912345671" : "",
    citizen_id: isEdit ? "079201001234" : "",
    gender: isEdit ? "Male" : "Male",
    date_of_birth: isEdit ? "1995-06-15" : "",
    department: isEdit ? "1" : "1",
    position: isEdit ? "1" : "2",
    hire_date: isEdit ? "2024-01-10" : new Date().toISOString().split("T")[0],
    contract_type: isEdit ? "Full-time" : "Full-time",
    status: isEdit ? "Active" : "Active",

    // Bảng users (Tạo tài khoản kèm theo)
    create_account: false,
    user_name: isEdit ? "tuan_chef" : "",
    email: isEdit ? "tuan@sweets.com" : "",
    password: "",
    role: "staff", // 'staff' | 'admin'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Nối API POST/PUT /api/employees & /api/users tại đây sau này
    alert(
      isEdit
        ? "Cập nhật hồ sơ nhân viên thành công (Mock)!"
        : "Tạo mới hồ sơ nhân viên & tài khoản thành công (Mock)!"
    );
    navigate("/admin/employees");
  };

  return (
    <>
      <AdminHeader title={isEdit ? "Chỉnh sửa hồ sơ nhân viên" : "Tạo hồ sơ nhân sự mới"} />
      <div className="admin-page-container">
        
        <div className="admin-card" style={{ maxWidth: "850px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "14px" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#1e293b" }}>
                {isEdit ? `Hồ sơ nhân viên #${formData.employee_code}` : "Thêm mới nhân viên"}
              </h3>
              <span style={{ fontSize: "13px", color: "#64748b" }}>
                Điền đầy đủ thông tin cá nhân, phòng ban và tài khoản đăng nhập
              </span>
            </div>
            <Link to="/admin/employees" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>
              &larr; Quay lại danh sách
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "25px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                background: activeTab === "profile" ? "#d4845a" : "#f1f5f9",
                color: activeTab === "profile" ? "#fff" : "#475569",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ion-icon name="id-card-outline"></ion-icon>
              <span>1. Thông tin hồ sơ (Employees)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("account")}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                background: activeTab === "account" ? "#d4845a" : "#f1f5f9",
                color: activeTab === "account" ? "#fff" : "#475569",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ion-icon name="person-circle-outline"></ion-icon>
              <span>2. Tài khoản đăng nhập (Users)</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* TAB 1: THÔNG TIN HỒ SƠ */}
            {activeTab === "profile" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Mã nhân viên *</label>
                    <input
                      type="text"
                      required
                      value={formData.employee_code}
                      onChange={(e) => setFormData({ ...formData, employee_code: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", background: "#f8fafc", fontWeight: "600" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Họ đệm *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Minh Tuấn"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0912345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Số CCCD / CMND *</label>
                    <input
                      type="text"
                      required
                      placeholder="12 số căn cước"
                      value={formData.citizen_id}
                      onChange={(e) => setFormData({ ...formData, citizen_id: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Giới tính</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Ngày sinh</label>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Phòng ban *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="1">Bếp Bánh (Kitchen)</option>
                      <option value="2">Thu Ngân & Bán Hàng</option>
                      <option value="3">Quản Lý Vận Hành</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Vị trí / Chức vụ *</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="1">Bếp Trưởng (Lương: 12,000,000 đ)</option>
                      <option value="2">Nhân Viên Bán Hàng (Lương: 7,500,000 đ)</option>
                      <option value="3">Thu Ngân (Lương: 8,000,000 đ)</option>
                      <option value="4">Quản Lý Cửa Hàng (Lương: 15,000,000 đ)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Ngày vào làm *</label>
                    <input
                      type="date"
                      required
                      value={formData.hire_date}
                      onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Loại hợp đồng</label>
                    <select
                      value={formData.contract_type}
                      onChange={(e) => setFormData({ ...formData, contract_type: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="Full-time">Chính thức (Full-time)</option>
                      <option value="Part-time">Bán thời gian (Part-time)</option>
                      <option value="Probation">Thử việc (Probation)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="Active">Đang làm việc</option>
                      <option value="On Leave">Đang nghỉ phép</option>
                      <option value="Resigned">Đã thôi việc</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("account")}
                    className="admin-btn-primary"
                    style={{ background: "#475569" }}
                  >
                    <span>Tiếp theo: Thiết lập tài khoản</span> &rarr;
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: TÀI KHOẢN ĐĂNG NHẬP */}
            {activeTab === "account" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      checked={formData.create_account || isEdit}
                      onChange={(e) => setFormData({ ...formData, create_account: e.target.checked })}
                      style={{ width: "18px", height: "18px" }}
                    />
                    <span>{isEdit ? "Liên kết tài khoản đăng nhập nội bộ" : "Cấp tài khoản đăng nhập nội bộ cho nhân viên này"}</span>
                  </label>
                  <p style={{ margin: "6px 0 0 28px", fontSize: "12px", color: "#64748b" }}>
                    Cho phép nhân viên đăng nhập vào hệ thống để phụ trách xử lý đơn hàng, kho bánh hoặc quản trị
                  </p>
                </div>

                {(formData.create_account || isEdit) && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Tên đăng nhập (user_name) *</label>
                        <input
                          type="text"
                          required
                          placeholder="VD: tuan_chef"
                          value={formData.user_name}
                          onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="VD: tuan@sweets.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                          {isEdit ? "Đổi mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu ban đầu *"}
                        </label>
                        <input
                          type="password"
                          required={!isEdit}
                          placeholder={isEdit ? "Nhập mật khẩu mới nếu muốn đổi..." : "Tối thiểu 6 ký tự"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Phân quyền hệ thống (Role) *</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                        >
                          <option value="staff">Nhân viên (Staff) - Quyền xem & duyệt đơn</option>
                          <option value="admin">Quản trị viên (Admin) - Toàn quyền hệ thống</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <button type="submit" className="admin-btn-primary">
                    <ion-icon name="save-outline"></ion-icon>
                    <span>{isEdit ? "Cập nhật hồ sơ nhân sự" : "Lưu hồ sơ nhân viên"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    style={{ padding: "10px 20px", borderRadius: "8px", background: "#f1f5f9", color: "#475569", border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                  >
                    &larr; Quay lại thông tin cá nhân
                  </button>
                </div>

              </div>
            )}

          </form>

        </div>

      </div>
    </>
  );
}
