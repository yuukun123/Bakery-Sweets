import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockProducts = [
  { id: 1, name: 'Chocolate Mousse', price: 12.99, image: 'p1.jpg' }
];

export default function Search() {
  const [term, setTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    setResults(mockProducts.filter(p => p.name.toLowerCase().includes(term.toLowerCase())));
  };

  return (
    <div className="search-page" style={{ padding: '50px 105px' }}>
      <h2>Advanced Search</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input type="text" placeholder="Product name..." value={term} onChange={e => setTerm(e.target.value)} style={{ padding: '10px' }} />
        <input type="number" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ padding: '10px', width: '100px' }} />
        <input type="number" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ padding: '10px', width: '100px' }} />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#d28f64', color: '#fff', border: 'none', cursor: 'pointer' }}>Search</button>
      </form>

      {searched && results.length === 0 && <p>No products found.</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {results.map(product => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: '10px', textAlign: 'center' }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={`/assets/Img/${product.image}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
