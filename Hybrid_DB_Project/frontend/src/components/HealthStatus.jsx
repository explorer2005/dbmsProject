import { useState, useEffect } from 'react'
import './HealthStatus.css'
import axios from 'axios'

function HealthStatus({ healthStatus: initialStatus }) {
  const [health, setHealth] = useState(initialStatus)
  const [loading, setLoading] = useState(!initialStatus)

  const fetchHealth = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:4000/health')
      setHealth(response.data)
    } catch (error) {
      setHealth({
        status: 'error',
        message: 'Backend server is not reachable',
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialStatus) {
      fetchHealth()
    }
  }, [])

  if (loading) {
    return <div className="loading">Checking system health...</div>
  }

  const getServiceStatus = (status) => {
    if (status === 1) return { label: 'Online', class: 'online', icon: '✅' }
    return { label: 'Offline', class: 'offline', icon: '❌' }
  }

  return (
    <div className="health-status">
      <div className="health-header">
        <h2>System Health Status</h2>
        <button onClick={fetchHealth} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {health.status === 'ok' ? (
        <>
          <div className="health-overview">
            <div className={`status-badge ${health.status}`}>
              <span className="status-icon">✅</span>
              <span className="status-text">System Operational</span>
            </div>
            <p className="timestamp">
              Last checked: {new Date(health.timestamp).toLocaleString()}
            </p>
            <p className="uptime">
              Uptime: {Math.floor(health.uptime)} seconds
            </p>
          </div>

          <div className="services-status">
            <h3>Service Status</h3>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-header">
                  <h4>PostgreSQL</h4>
                  {(() => {
                    const status = getServiceStatus(health.services.postgresql)
                    return (
                      <span className={`service-status ${status.class}`}>
                        {status.icon} {status.label}
                      </span>
                    )
                  })()}
                </div>
                <p>Database connection and queries</p>
              </div>

              <div className="service-card">
                <div className="service-header">
                  <h4>Firebase</h4>
                  {(() => {
                    const status = getServiceStatus(health.services.firebase)
                    return (
                      <span className={`service-status ${status.class}`}>
                        {status.icon} {status.label}
                      </span>
                    )
                  })()}
                </div>
                <p>Firestore and Firebase Admin SDK</p>
                {health.services.firebase === 0 && (
                  <p className="service-note">
                    ⚠️ Firebase requires service account JSON to initialize
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="health-info">
            <h3>System Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className="info-value">{health.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Timestamp:</span>
                <span className="info-value">{health.timestamp}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Uptime:</span>
                <span className="info-value">{health.uptime.toFixed(2)}s</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="health-error">
          <div className="error-icon">⚠️</div>
          <h3>System Unavailable</h3>
          <p>{health.message || 'Unable to connect to backend server'}</p>
          {health.error && (
            <p className="error-details">Error: {health.error}</p>
          )}
          <div className="troubleshooting">
            <h4>Troubleshooting Steps:</h4>
            <ol>
              <li>Make sure the backend server is running on port 4000</li>
              <li>Check if PostgreSQL service is running</li>
              <li>Verify the backend is accessible at http://localhost:4000</li>
              <li>Check browser console for CORS or network errors</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default HealthStatus

