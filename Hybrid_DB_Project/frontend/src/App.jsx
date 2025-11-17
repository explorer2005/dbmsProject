import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Inventory from './components/Inventory'
import HealthStatus from './components/HealthStatus'
import Notifications from './components/Notifications'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [healthStatus, setHealthStatus] = useState(null)

  useEffect(() => {
    // Fetch health status on mount
    fetch('http://localhost:4000/health')
      .then(res => res.json())
      .then(data => setHealthStatus(data))
      .catch(err => {
        console.error('Health check failed:', err)
        setHealthStatus({ status: 'error', message: 'Backend not reachable' })
      })
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="container">
        <nav className="tabs">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={activeTab === 'inventory' ? 'active' : ''}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button 
            className={activeTab === 'health' ? 'active' : ''}
            onClick={() => setActiveTab('health')}
          >
            System Health
          </button>
          <button
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </nav>

        <main className="content">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'health' && <HealthStatus healthStatus={healthStatus} />}
          {activeTab === 'notifications' && <Notifications />}
        </main>
      </div>
    </div>
  )
}

export default App

