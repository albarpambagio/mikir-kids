import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { AuthLanding } from './pages/AuthLanding'
import { UserIdDisplay } from './pages/UserIdDisplay'
import { GradeSelection } from './pages/GradeSelection'
import { Dashboard } from './pages/Dashboard'
import { DashboardTest } from './pages/DashboardTest'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLanding />} />
          <Route path="/user-id-display" element={<UserIdDisplay />} />
          <Route path="/grade-selection" element={<GradeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-test" element={<DashboardTest />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

