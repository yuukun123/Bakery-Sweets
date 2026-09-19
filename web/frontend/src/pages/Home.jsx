import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import useCartStore from "../store/cartStore";
import "./Home.css";

const CATEGORIES = ["all", "Mousse", "Croissant", "Drink"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addItem, toggleCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [category, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/products`, {
        params: { category: category !== "all" ? category : undefined, term, page, limit: 8 }
      });
      setProducts(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setProducts([]);
    } finally { setLoading(false); }
  };

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchProducts(); };

  const handleAddToCart = async (product) => {
    try {
      const res = await axios.get(`${BASE_URL}/products/${product.product_id}/sizes`);
      const sizes = res.data;
      if (sizes.length === 1) {
        addItem(product, sizes[0]); toggleCart();
      } else {
        window.location.href = `/product/${product.product_id}`;
      }
    } catch { addItem(product, { size_id: 1, size_name: "Default", price: product.price || 0 }); toggleCart(); }
  };

  return (
    <div className="Home_main">
      <div className="bg-screen">
        <div className="carousel_wrapper">
          <img className="slide-banner-img" alt="banner" src="/assets/Img/banner1.jpg" width={1300} height={430} />
        </div>
      </div>

      <div className="pg-12">
        <div className="flex-full">
          <nav className="nav-container">
            <ul className="nav-links">
              {CATEGORIES.map((cat, i) => (
                <li key={cat}>
                  <label
                    className={`nav-item ${category === cat ? "active" : ""}`}
                    onClick={() => { setCategory(cat); setPage(1); }}
                  >{cat.toUpperCase()}</label>
                  {i < CATEGORIES.length - 1 && <li>/</li>}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="tab_content" id="product-container">
          {loading ? <p style={{textAlign:"center"}}>Loading...</p> : products.length === 0 ? (
            <p id="no-result-message">No products found!</p>
          ) : products.map((item) => (
            <div className="movie-item" key={item.product_id} data-category={item.category_name}>
              <Link to={`/product/${item.product_id}`} target="_blank">
                <img className="poster-img" height={300} width={300} src={item.image} alt={item.product_name} />
              </Link>
              <p className="title">{item.product_name}</p>
              {item.status === "Available" ? (
                <button className="add-to-cart butn title" onClick={() => handleAddToCart(item)}>
                  <p className="text-color">Price: {Number(item.min_price || item.price).toLocaleString("vi-VN")} VND</p>
                </button>
              ) : (
                <button className="butn title disabled-btn" disabled>
                  <p className="text-color">{item.status}</p>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="container">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`page-link ${p === page ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
