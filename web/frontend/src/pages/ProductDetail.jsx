import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const mockProduct = {
  id: 1,
  name: 'Chocolate Mousse',
  price: 12.99,
  image: 'p1.jpg',
  description: 'Delicious chocolate mousse cake with a smooth texture.'
};
const mockSizes = [
  { id: 1, size_name: 'Small', extra_price: 0 },
  { id: 2, size_name: 'Medium', extra_price: 2.50 },
  { id: 3, size_name: 'Large', extra_price: 5.00 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  
  const [product] = useState(mockProduct);
  const [sizes] = useState(mockSizes);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    const sizeObj = sizes.find(s => s.id === parseInt(selectedSize));
    const extra = sizeObj ? sizeObj.extra_price : 0;
    
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price + extra,
      size: sizeObj ? sizeObj.size_name : '',
      quantity
    });
    alert('Added to cart!');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail" style={{ padding: '50px 105px', display: 'flex', gap: '40px' }}>
      <div className="product-image" style={{ flex: 1 }}>
        <img src={`/assets/Img/${product.image}`} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
      </div>
      <div className="product-info" style={{ flex: 1 }}>
        <h1>{product.name}</h1>
        <p className="price" style={{ fontSize: '24px', color: '#d28f64', fontWeight: 'bold' }}>${product.price}</p>
        <p>{product.description}</p>
        
        {sizes.length > 0 && (
          <div className="sizes" style={{ margin: '20px 0' }}>
            <label>Size:</label>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
              <option value="">Select size</option>
              {sizes.map(s => (
                <option key={s.id} value={s.id}>{s.size_name} (+${s.extra_price})</option>
              ))}
            </select>
          </div>
        )}

        <div className="quantity" style={{ margin: '20px 0' }}>
          <label>Quantity:</label>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} style={{ width: '60px', marginLeft: '10px', padding: '5px' }} />
        </div>

        <button onClick={handleAddToCart} style={{ padding: '10px 30px', backgroundColor: '#d28f64', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Add to Cart</button>
      </div>
    </div>
  );
}

