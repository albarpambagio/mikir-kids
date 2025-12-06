import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { LoadingSpinner } from '@/components/LoadingSpinner'

// Placeholder pages - will be implemented in later phases
function Dashboard() {
  return <div className="p-8">Dashboard - Coming Soon</div>
}

function UserIdEntry() {
  return <div className="p-8">User ID Entry - Coming Soon</div>
}

function UserIdDisplay() {
  return <div className="p-8">User ID Display - Coming Soon</div>
}

function Session() {
  return <div className="p-8">Session - Coming Soon</div>
}

function Summary() {
  return <div className="p-8">Summary - Coming Soon</div>
}

function NotFound() {
  return <div className="p-8">404 - Page Not Found</div>
}

function App() {
  const { loading, initialized, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/user-id-entry" element={<UserIdEntry />} />
        <Route path="/user-id-display" element={<UserIdDisplay />} />

        {/* Protected routes - placeholder for now */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path="/session/:id/summary" element={<Summary />} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
