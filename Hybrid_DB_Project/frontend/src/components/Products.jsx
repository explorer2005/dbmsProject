import { useState, useEffect } from 'react'
import './Products.css'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:4000/api/products')
      setProducts(response.data.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Out of Stock', class: 'out-of-stock' }
    if (stock <= minStock) return { label: 'Low Stock', class: 'low-stock' }
    return { label: 'In Stock', class: 'in-stock' }
  }

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    )
  }

  return (
    <div className="products">
      <div className="products-header">
        <h2>Products Catalog</h2>
        <button onClick={fetchProducts} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="products-grid">
        {products.map(product => {
          const stockStatus = getStockStatus(
            product.stock_quantity,
            product.min_stock_level || 10
          )
          
          return (
            <div key={product.product_id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className={`stock-badge ${stockStatus.class}`}>
                  {stockStatus.label}
                </span>
              </div>
              
              <p className="product-sku">SKU: {product.sku}</p>
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <div className="detail-item">
                  <span className="label">Price:</span>
                  <span className="value">${parseFloat(product.price).toFixed(2)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Stock:</span>
                  <span className="value">{product.stock_quantity} units</span>
                </div>
                {product.rating_average > 0 && (
                  <div className="detail-item">
                    <span className="label">Rating:</span>
                    <span className="value">
                      ⭐ {parseFloat(product.rating_average).toFixed(1)} 
                      ({product.rating_count} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}
    </div>
  )
}

export default Products

