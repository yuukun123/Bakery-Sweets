import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['ALL', 'MOUSSE', 'CROISSANT', 'DRINK'];
const BANNERS = ['/assets/Img/banner1.jpg', '/assets/Img/banner2.jpg'];

// Mock data
const mockProducts = [
  { id: 1, name: 'Chocolate Mousse', price: 12.99, image: 'p1.jpg', category: 'MOUSSE' },
  { id: 2, name: 'Butter Croissant', price: 4.50, image: 'p2.jpg', category: 'CROISSANT' },
  { id: 3, name: 'Strawberry Drink', price: 5.99, image: 'p3.jpg', category: 'DRINK' },
  { id: 4, name: 'Matcha Cake', price: 15.00, image: 'p4.jpg', category: 'MOUSSE' }
];

export default function Home() {
  const [category, setCategory] = useState('ALL');
  const [page, setPage] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  const totalPages = 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(timer);
  }, []);

  // Filter mock products
  const products = category === 'ALL' ? mockProducts : mockProducts.filter(p => p.category === category);

  return (
    <div className="Home_main">
      <div className="banner" style={{ width: "100%", overflow: "hidden", position: "relative", height: "450px" }}>
        {BANNERS.map((banner, idx) => (
          <img
            key={idx}
            src={banner}
            alt={`Banner ${idx + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: currentBanner === idx ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              display: 'block'
            }}
          />
        ))}
      </div>

      <div className="pg-12" style={{ marginTop: '30px' }}>
        <div className="container" style={{ padding: '0 105px' }}>
          <div className="content">
            <ul className="nav-links" style={{ display: 'flex', listStyle: 'none', padding: 0, gap: '20px', marginBottom: '30px' }}>
              {CATEGORIES.map((cat, i) => (
                <React.Fragment key={cat}>
                  <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <label
                      className={`nav-item ${category === cat ? "active" : ""}`}
                      onClick={() => { setCategory(cat); setPage(1); }}
                      style={{
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: category === cat ? '#d28f64' : '#000',
                        fontSize: '16px'
                      }}
                    >
                      {cat}
                    </label>
                  </li>
                  {i < CATEGORIES.length - 1 && (
                    <li style={{ display: 'inline-flex', alignItems: 'center', color: '#000', fontWeight: 'bold' }}>/</li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {products.length === 0 ? (
              <p>No products found!</p>
            ) : (
              <div className="product-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px'
              }}>
                {products.map(product => (
                  <div key={product.id} className="product-card" style={{ border: '1px solid #eee', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={`/assets/Img/${product.image || 'default.jpg'}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                      <div className="info" style={{ marginTop: '10px' }}>
                        <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
                        <p className="price" style={{ color: '#d28f64', fontWeight: 'bold' }}>${product.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: page === p ? '#d28f64' : '#eee',
                      color: page === p ? '#fff' : '#000',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

