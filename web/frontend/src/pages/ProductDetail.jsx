import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import useCartStore from "../store/cartStore";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem, toggleCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [prodRes, sizeRes] = await Promise.all([
          axios.get(`${BASE_URL}/products/${id}`),
          axios.get(`${BASE_URL}/products/${id}/sizes`),
        ]);
        setProduct(prodRes.data);
        setSizes(sizeRes.data);
        if (sizeRes.data.length > 0) setSelectedSize(sizeRes.data[0]);
      } catch { navigate("/"); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, quantity);
    toggleCart();
  };

  if (loading) return <p style={{textAlign:"center",padding:"40px"}}>Loading...</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-img">
        <img src={product.image} alt={product.product_name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.product_name}</h1>
        <p className="category">{product.category_name}</p>

        <div className="size-selector">
          <h3>Select Size:</h3>
          <div className="size-options">
            {sizes.map((s) => (
              <button
                key={s.size_id}
                className={`size-btn ${selectedSize?.size_id === s.size_id ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s.size_name}
                <span>{Number(s.price).toLocaleString("vi-VN")} VND</span>
              </button>
            ))}
          </div>
        </div>

        {selectedSize && (
          <p className="product-price">{Number(selectedSize.price).toLocaleString("vi-VN")} VND</p>
        )}

        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!selectedSize || product.status !== "Available"}
        >
          {product.status === "Available" ? "Add to Cart" : product.status}
        </button>

        <div className="product-meta">
          {product.ingredients && <p><strong>Ingredients:</strong> {product.ingredients}</p>}
          {product.expiration_date && <p><strong>Expiry:</strong> {product.expiration_date}</p>}
          {product.storage_instructions && <p><strong>Storage:</strong> {product.storage_instructions}</p>}
        </div>
      </div>
    </div>
  );
}
