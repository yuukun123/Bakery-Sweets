import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/config";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
import "./Pay.css";

export default function Pay() {
  const { user, token } = useAuthStore();
  const { items, totalCost, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    recipient_name: user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "",
    recipient_phone: user?.phone || "",
    shipping_city: "", shipping_district: "", shipping_ward: "", shipping_street: "",
    delivery_date: "", delivery_time: "",
    payment_method: "COD", note: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        items: items.map(i => ({ product_id: i.product_id, size_id: i.size_id, quantity: i.quantity, price: i.price, note: "" })),
        total_quantity: items.reduce((s, i) => s + i.quantity, 0),
        total_cost: totalCost(),
      };
      const res = await axios.post(`${BASE_URL}/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(res.data);
      clearCart();
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Please try again.");
    } finally { setLoading(false); }
  };

  if (!user) { navigate("/login"); return null; }

  return (
    <div className="pay-container">
      {success ? (
        <div className="confirmation">
          <div className="icon-wrapper"><ion-icon name="checkmark-circle-outline"></ion-icon></div>
          <h1>SUCCESS</h1>
          <p className="order-id"><strong>Your Order ID </strong><strong>#{success.order_id}</strong></p>
          <p style={{fontSize:14}}>Thank you for choosing our service!</p>
          <p style={{fontSize:14}}>Your order is on its way with love.</p>
          <button onClick={() => navigate("/receipt")} className="view-invoice-btn">Click here to view the invoice</button>
          <p>Wishing you the sweetest day!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="pay-form">
          <div className="pay-left">
            <h1>Delivery Information</h1>
            {[["recipient_name","Recipient Name"],["recipient_phone","Phone"],["shipping_city","City"],
              ["shipping_district","District"],["shipping_ward","Ward"],["shipping_street","Street"]].map(([f,l]) => (
              <div className="input-group" key={f}>
                <label>{l}</label>
                <input type="text" value={form[f]} onChange={set(f)} required />
              </div>
            ))}
            <div className="input-group">
              <label>Delivery Date</label>
              <input type="date" value={form.delivery_date} onChange={set("delivery_date")} required />
            </div>
            <div className="input-group">
              <label>Delivery Time</label>
              <input type="time" min="08:00" max="20:00" value={form.delivery_time} onChange={set("delivery_time")} required />
            </div>
            <div className="note">
              <label>Greeting Message</label>
              <textarea rows={2} value={form.note} onChange={set("note")} />
            </div>
            <h1>Payment Method</h1>
            <div className="payment-method">
              <label><input type="radio" name="payment_method" value="COD" checked={form.payment_method === "COD"} onChange={set("payment_method")} /> COD</label>
              <label><input type="radio" name="payment_method" value="Momo" checked={form.payment_method === "Momo"} onChange={set("payment_method")} /> Momo</label>
              <label><input type="radio" name="payment_method" value="VNPay" checked={form.payment_method === "VNPay"} onChange={set("payment_method")} /> VNPay</label>
            </div>
          </div>
          <div className="my-order">
            <div className="Text-head"><h1>Your Orders</h1></div>
            <div className="product-list">
              {items.map(item => (
                <div className="product" key={`${item.product_id}-${item.size_id}`}>
                  <div className="item">
                    <img width={55} height={69} src={item.image} alt={item.product_name} />
                    <div className="details">
                      <div>{item.product_name} - {item.size_name}</div>
                      <div className="btn-quantity">Quantity: {item.quantity}</div>
                    </div>
                    <div className="price">{(item.price * item.quantity).toLocaleString("vi-VN")} VND</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="subtotal">
              <div className="total">
                <div className="total-sum">
                  <div>Total</div>
                  <div className="price">{totalCost().toLocaleString("vi-VN")} VND</div>
                </div>
              </div>
            </div>
            <div className="notification"><p>Notification: Please review your order before proceeding to payment.</p></div>
            <div className="pay"><button type="submit" className="pay-button" disabled={loading || items.length === 0}>{loading ? "Processing..." : "Pay"}</button></div>
          </div>
        </form>
      )}
    </div>
  );
}
