import { useState, useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios'

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    inventoryValue: 0,
    lowStock: 0,
    outOfStock: 0,
    loading: true
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, inventoryRes] = await Promise.all([
        axios.get('http://localhost:4000/api/products'),
        axios.get('http://localhost:4000/api/inventory/summary')
      ])

      setStats({
        products: productsRes.data.count,
        inventoryValue: parseFloat(inventoryRes.data.current.total_stock_value),
        lowStock: inventoryRes.data.current.low_stock_count,
        outOfStock: inventoryRes.data.current.out_of_stock_count,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  if (stats.loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${stats.inventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p>Inventory Value</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{stats.lowStock}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">🚫</div>
          <div className="stat-info">
            <h3>{stats.outOfStock}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <h3>System Information</h3>
        <p>This dashboard displays real-time statistics from your PostgreSQL database.</p>
        <p>The inventory summary is calculated using a PL/pgSQL cursor-based stored procedure.</p>
        <button onClick={fetchStats} className="refresh-btn">
          🔄 Refresh Data
        </button>
      </div>
    </div>
  )
}

export default Dashboard

