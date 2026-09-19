import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

export default function Pay() {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const navigate = useNavigate();

  const handlePay = () => {
    alert("Payment successful!");
    clearCart();
    navigate('/receipt');
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="pay-page" style={{ padding: '50px 105px' }}>
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item.name} ({item.size}) x {item.quantity} - ${item.price * item.quantity}</li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handlePay} style={{ padding: '10px 20px', backgroundColor: '#d28f64', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Pay Now</button>
        </div>
      )}
    </div>
  );
}

