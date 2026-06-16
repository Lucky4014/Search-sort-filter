import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // Filter & Sort State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const categories = ['', 'Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Beauty'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Build query string dynamically
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (minRating) params.append('minRating', minRating);
      if (sortBy) params.append('sortBy', sortBy);
      if (order) params.append('order', order);

      const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setCount(data.count);
    } catch (err) {
      console.error('Error fetching:', err);
    }
    setLoading(false);
  };

  // Fetch on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSortBy('createdAt');
    setOrder('desc');
    setTimeout(fetchProducts, 100);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 Product Catalog</h1>
        <p>Task 14 – Search, Sort & Filter with MongoDB</p>
      </header>

      <div className="controls">
        {/* SEARCH */}
        <div className="control-group full-width">
          <label>🔍 Search</label>
          <input
            type="text"
            placeholder="Search by name, brand, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
          />
        </div>

        {/* FILTER: Category */}
        <div className="control-group">
          <label>📂 Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat || 'All Categories'}</option>
            ))}
          </select>
        </div>

        {/* FILTER: Price Range */}
        <div className="control-group">
          <label>💰 Min Price ($)</label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label>💰 Max Price ($)</label>
          <input
            type="number"
            placeholder="9999"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* FILTER: Rating */}
        <div className="control-group">
          <label>⭐ Min Rating</label>
          <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
            <option value="">Any Rating</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>

        {/* SORT */}
        <div className="control-group">
          <label>↕️ Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="control-group">
          <label>🔃 Order</label>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="control-group buttons">
          <button className="btn-search" onClick={fetchProducts}>🔍 Search</button>
          <button className="btn-reset" onClick={handleReset}>♻️ Reset</button>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="results-info">
        {loading ? '⏳ Loading...' : `✅ Showing ${count} product(s)`}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {!loading && products.length === 0 && (
          <div className="no-results">😕 No products found. Try different filters!</div>
        )}
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-category">{product.category}</div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">by {product.brand}</p>
            <p className="product-desc">{product.description}</p>
            <div className="product-rating">
              {renderStars(product.rating)} <span>({product.rating})</span>
            </div>
            <div className="product-footer">
              <span className="product-price">${product.price}</span>
              <span className="product-stock">Stock: {product.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
