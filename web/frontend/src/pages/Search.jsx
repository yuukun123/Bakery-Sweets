import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import "./Search.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ term: searchParams.get("term") || "", category: "all", minPrice: "", maxPrice: "" });

  useEffect(() => { if (form.term) handleSearch(); }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/products`, {
        params: { term: form.term, category: form.category !== "all" ? form.category : undefined,
          minPrice: form.minPrice || undefined, maxPrice: form.maxPrice || undefined, limit: 50 }
      });
      setProducts(res.data.data || []);
    } catch { setProducts([]); } finally { setLoading(false); }
  };

  return (
    <div className="search-page">
      <h1>Advanced Search</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-fields">
          <input type="text" placeholder="Product name..." value={form.term} onChange={e => setForm({...form,term:e.target.value})} />
          <select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>
            <option value="all">All Categories</option>
            <option value="Mousse">Mousse</option>
            <option value="Croissant">Croissant</option>
            <option value="Drink">Drink</option>
          </select>
          <input type="number" placeholder="Min price" value={form.minPrice} onChange={e => setForm({...form,minPrice:e.target.value})} />
          <input type="number" placeholder="Max price" value={form.maxPrice} onChange={e => setForm({...form,maxPrice:e.target.value})} />
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="search-results">
        {loading ? <p>Searching...</p> : products.length === 0 ? <p>No products found.</p> :
          products.map(p => (
            <div className="movie-item" key={p.product_id}>
              <Link to={`/product/${p.product_id}`}>
                <img className="poster-img" src={p.image} alt={p.product_name} width={300} height={300} />
              </Link>
              <p className="title">{p.product_name}</p>
              <p className="text-color">{Number(p.min_price || p.price || 0).toLocaleString("vi-VN")} VND</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
