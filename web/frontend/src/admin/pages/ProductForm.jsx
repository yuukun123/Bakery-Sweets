import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Mock form state (Sau này kết nối API POST/PUT /api/products tại đây)
  const [formData, setFormData] = useState({
    name: isEdit ? "Chocolate Mousse" : "",
    category: isEdit ? "Mousse" : "Mousse",
    price: isEdit ? "45000" : "",
    stock: isEdit ? "25" : "10",
    description: isEdit ? "Bánh mousse sô-cô-la ngọt ngào thơm ngon." : "",
    image: isEdit ? "/assets/Img/Mousse1.png" : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isEdit ? "Cập nhật sản phẩm thành công (Mock)!" : "Thêm bánh mới thành công (Mock)!");
    navigate("/admin/products");
  };

  return (
    <>
      <AdminHeader title={isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"} />
      <div className="admin-page-container">
        
        <div className="admin-card" style={{ maxWidth: "750px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>
              {isEdit ? `Sửa thông tin bánh #${id}` : "Nhập thông tin bánh mới"}
            </h3>
            <Link to="/admin/products" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>
              &larr; Quay lại danh sách
            </Link>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Tên bánh *</label>
              <input
                type="text"
                required
                placeholder="VD: Chocolate Mousse"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Danh mục *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                >
                  <option value="Mousse">Mousse</option>
                  <option value="Croissant">Croissant</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Giá bán (VNĐ) *</label>
                <input
                  type="number"
                  required
                  placeholder="VD: 45000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Đường dẫn hình ảnh (URL / Path)</label>
              <input
                type="text"
                placeholder="VD: /assets/Img/Mousse1.png"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Mô tả sản phẩm</label>
              <textarea
                rows="4"
                placeholder="Nhập mô tả bánh..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
              ></textarea>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <button type="submit" className="admin-btn-primary">
                <ion-icon name="save-outline"></ion-icon>
                <span>{isEdit ? "Cập nhật sản phẩm" : "Lưu bánh mới"}</span>
              </button>
              <Link to="/admin/products" style={{ padding: "10px 20px", borderRadius: "8px", background: "#f1f5f9", color: "#475569", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                Hủy bỏ
              </Link>
            </div>
          </form>
        </div>

      </div>
    </>
  );
}
