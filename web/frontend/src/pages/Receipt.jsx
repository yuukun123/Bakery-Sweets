import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../api/config";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import "./Receipt.css";

export default function Receipt() {
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    axios.get(`${BASE_URL}/orders/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data)).catch(() => {});
  }, [user]);

  const viewDetail = async (orderId) => {
    try {
      const res = await axios.get(`${BASE_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDetail(res.data);
      setShowDetail(true);
    } catch {}
  };

  const statusColor = (s) => ({ Pending:"#f39c12", Processing:"#3498db", Shipping:"#9b59b6", Completed:"#27ae60", Cancelled:"#e74c3c" }[s] || "#999");

  return (
    <div className="receipt">
      <div className="big-text"><h1>Your Receipt</h1></div>
      {!user ? (
        <p style={{textAlign:"center",color:"red",margin:"30px 0"}}>
          You are not logged in. Please <button onClick={() => navigate("/login")} style={{color:"#d4845a",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>log in</button> to view the invoice.
        </p>
      ) : (
        <>
          <div className="text-infor">
            {["Order#","Date","Quantity","Total cost","Status","Action"].map(h=>(
              <div className="text-top" key={h}><p>{h}</p></div>
            ))}
          </div>
          {orders.length === 0 ? <p style={{textAlign:"center",padding:"20px"}}>No orders found.</p> :
            orders.map(o => (
              <div className="custumer" key={o.order_id}>
                <div className="text"><p>{o.order_code || `#${o.order_id}`}</p></div>
                <div className="text"><p>{new Date(o.order_date).toLocaleString("vi-VN")}</p></div>
                <div className="text"><p>{o.total_quantity}</p></div>
                <div className="text"><p>{Number(o.total_cost).toLocaleString("vi-VN")} VND</p></div>
                <div className="text"><p style={{color:statusColor(o.status),fontWeight:600}}>{o.status}</p></div>
                <div className="text"><button className="choose" onClick={() => viewDetail(o.order_id)}>View more</button></div>
              </div>
            ))}
        </>
      )}

      {showDetail && detail && (
        <>
          <div className="blur-overlay" onClick={() => setShowDetail(false)}></div>
          <div className="more-infor-content">
            <h3>Order {detail.order_code || `#${detail.order_id}`}</h3>
            <p>Status: <span style={{color:statusColor(detail.status),fontWeight:600}}>{detail.status}</span></p>
            <p>Date: {new Date(detail.order_date).toLocaleString("vi-VN")}</p>
            <hr/>
            {detail.items?.map((item,i) => (
              <div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px"}}>
                <img src={item.image} width={50} height={60} style={{borderRadius:6,objectFit:"cover"}} alt={item.product_name}/>
                <div>
                  <p>{item.product_name} - {item.size_name}</p>
                  <p>x{item.quantity} — {Number(item.price * item.quantity).toLocaleString("vi-VN")} VND</p>
                </div>
              </div>
            ))}
            <hr/>
            <p style={{fontWeight:700}}>Total: {Number(detail.total_cost).toLocaleString("vi-VN")} VND</p>
            <button onClick={() => setShowDetail(false)} style={{marginTop:10,padding:"8px 20px",background:"#d4845a",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"}}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}
