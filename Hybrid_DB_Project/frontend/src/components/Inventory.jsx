import { useState, useEffect } from 'react'
import './Inventory.css'
import axios from 'axios'

function Inventory() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInventorySummary()
  }, [])

  const fetchInventorySummary = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:4000/api/inventory/summary')
      setSummary(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch inventory summary. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading inventory summary...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchInventorySummary}>Retry</button>
      </div>
    )
  }

  const current = summary.current
  const latest = summary.latest_summary

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h2>Inventory Summary</h2>
        <button onClick={fetchInventorySummary} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="info-box">
        <p>📊 This summary is generated using a PL/pgSQL cursor-based stored procedure that iterates through all products.</p>
      </div>

      <div className="summary-section">
        <h3>Current Inventory Status</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">📦</div>
            <div className="summary-content">
              <h4>Total Products</h4>
              <p className="summary-value">{current.total_products}</p>
            </div>
          </div>

          <div className="summary-card highlight">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h4>Total Stock Value</h4>
              <p className="summary-value">
                ${parseFloat(current.total_stock_value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          </div>

          <div className="summary-card warning">
            <div className="summary-icon">⚠️</div>
            <div className="summary-content">
              <h4>Low Stock Items</h4>
              <p className="summary-value">{current.low_stock_count}</p>
            </div>
          </div>

          <div className="summary-card danger">
            <div className="summary-icon">🚫</div>
            <div className="summary-content">
              <h4>Out of Stock</h4>
              <p className="summary-value">{current.out_of_stock_count}</p>
            </div>
          </div>
        </div>
      </div>

      {latest && (
        <div className="latest-summary">
          <h3>Latest Summary Record</h3>
          <div className="summary-details">
            <p><strong>Summary ID:</strong> {latest.summary_id}</p>
            <p><strong>Last Updated:</strong> {new Date(latest.last_updated).toLocaleString()}</p>
            <p><strong>Created At:</strong> {new Date(latest.created_at).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="procedure-info">
        <h3>About the Cursor Procedure</h3>
        <p>
          The <code>test_cursor_proc()</code> function uses a PL/pgSQL CURSOR to iterate through all active products,
          calculate inventory statistics, and store the results in the <code>inventory_summary</code> table.
        </p>
        <p>
          This demonstrates advanced PostgreSQL features including cursors, stored procedures, and transactional operations.
        </p>
      </div>
    </div>
  )
}

export default Inventory

