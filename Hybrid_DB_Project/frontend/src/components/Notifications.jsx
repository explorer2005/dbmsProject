import { useState, useEffect } from 'react'
import './Notifications.css'
import axios from 'axios'

const DEFAULT_USER_ID = 'b2c3d4e5-f6a7-4890-b123-456789012345'

function Notifications() {
  const [userId, setUserId] = useState(DEFAULT_USER_ID)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotifications = async (id = userId) => {
    if (!id) {
      setError('Please provide a user ID')
      return
    }
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:4000/api/firestore/notifications/${id}`)
      setNotifications(response.data.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch notifications. Ensure backend + Firebase are running.')
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications(DEFAULT_USER_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="notifications">
      <div className="notifications-header">
        <div>
          <h2>User Notifications</h2>
          <p>Fetching from Firestore via backend</p>
        </div>
        <div className="user-input">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
          <button onClick={() => fetchNotifications()}>Load Notifications</button>
        </div>
      </div>

      {loading && <div className="loading">Loading notifications...</div>}
      {error && (
        <div className="error">
          {error}
          <button onClick={() => fetchNotifications()}>Retry</button>
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="empty-state">No notifications found for this user.</div>
      )}

      <div className="notifications-grid">
        {notifications.map((item) => (
          <div key={item.id} className={`notification-card ${item.priority || 'normal'}`}>
            <div className="notification-header">
              <span className="type">{item.type || 'general'}</span>
              <span className={`status ${item.isRead ? 'read' : 'unread'}`}>
                {item.isRead ? 'Read' : 'Unread'}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.message}</p>
            {item.linkUrl && (
              <a href={item.linkUrl} target="_blank" rel="noreferrer">
                View details →
              </a>
            )}
            <div className="meta">
              <span>Priority: {item.priority || 'normal'}</span>
              {item.createdAt && <span>{new Date(item.createdAt._seconds * 1000).toLocaleString()}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications

