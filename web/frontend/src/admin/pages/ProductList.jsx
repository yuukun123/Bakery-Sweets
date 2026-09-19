import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [products] = useState([
    { id: 1, name: "Chocolate Mousse", category: "Mousse", price: "45,000 đ", stock: 25, img: "/assets/Img/Mousse1.png" },
    { id: 2, name: "Butter Croissant", category: "Croissant", price: "35,000 đ", stock: 40, img: "/assets/Img/croissant1.png" },
    { id: 3, name: "Matcha Latte Cake", category: "Mousse", price: "55,000 đ", stock: 15, img: "/assets/Img/Mousse2.png" },
    { id: 4, name: "Almond Croissant", category: "Croissant", price: "40,000 đ", stock: 18, img: "/assets/Img/croissant2.png" },
    { id: 5, name: "Peach Tea", category: "Drink", price: "30,000 đ", stock: 50, img: "/assets/Img/drink1.png" },
  ]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <AdminHeader title="Quản lý sản phẩm bánh ngọt" />
      <div className="admin-page-container">
        
        <div className="admin-card" style={{ marginBottom: "20px", padding: "16px 20px" }}>
          <div className="admin-toolbar" style={{ margin: 0 }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, minWidth: "260px" }}>
              <input
                type="text"
                placeholder="Tìm tên bánh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "240px" }}
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="all">Tất cả danh mục</option>
                <option value="Mousse">Mousse</option>
                <option value="Croissant">Croissant</option>
                <option value="Drink">Drink</option>
              </select>
            </div>

            <Link to="/admin/products/add" className="admin-btn-primary">
              <ion-icon name="add-circle-outline"></ion-icon>
              <span>Thêm bánh mới</span>
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>Hình ảnh</th>
                  <th>Tên bánh</th>
                  <th>Danh mục</th>
                  <th>Giá bán</th>
                  <th>Tồn kho</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.img}
                        alt={p.name}
                        style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        onError={(e) => { e.target.src = "/assets/Img/Sweets1.png"; }}
                      />
                    </td>
                    <td style={{ fontWeight: "600", color: "#1e293b" }}>{p.name}</td>
                    <td><span className="admin-status-pill success">{p.category}</span></td>
                    <td style={{ fontWeight: "600" }}>{p.price}</td>
                    <td>{p.stock} cái</td>
                    <td style={{ textAlign: "right" }}>
                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="admin-btn-default"
                        style={{ padding: "5px 10px", fontSize: "12px", marginRight: "6px" }}
                      >
                        <ion-icon name="create-outline"></ion-icon> Sửa
                      </Link>
                      <button
                        onClick={() => alert(`Xóa sản phẩm ID: ${p.id}`)}
                        className="admin-btn-cancel"
                        style={{ padding: "5px 10px", fontSize: "12px" }}
                      >
                        <ion-icon name="trash-outline"></ion-icon> Xóa
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
