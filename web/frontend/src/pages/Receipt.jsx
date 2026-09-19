import React from 'react';
import useAuthStore from '../store/authStore';

export default function Receipt() {
  const user = useAuthStore(state => state.user);
  
  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>You are not logged in. Please login to view the invoice.</p>
      </div>
    );
  }

  return (
    <div className="receipt-page" style={{ padding: '50px 105px' }}>
      <h2>Your Receipts</h2>
      <p>No recent orders found.</p>
    </div>
  );
}

