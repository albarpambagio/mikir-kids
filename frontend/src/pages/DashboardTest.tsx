/**
 * Dashboard Test Page
 * 
 * This is a helper page for testing the Dashboard without going through
 * the full auth flow. Use this for development and testing.
 * 
 * Usage:
 * 1. Navigate to: http://localhost:5173/dashboard-test?userId=12345678
 * 2. Or use the form below to enter a userId
 */

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Dashboard } from "./Dashboard"

export function DashboardTest() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [userId, setUserId] = useState(searchParams.get("userId") || "")
  const [userName, setUserName] = useState(searchParams.get("userName") || "Test User")

  const handleGoToDashboard = () => {
    if (userId) {
      navigate("/dashboard", {
        state: {
          userId,
          userName,
          gradeLevel: "SMP",
          classLevel: 7
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard Test Helper</h1>
        
        <div className="bg-card border rounded-lg p-6 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              User ID (8 digits)
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="12345678"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              User Name (optional)
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Test User"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            onClick={handleGoToDashboard}
            disabled={!userId}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="font-semibold mb-2">Quick Test URLs:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <a 
                href="/dashboard-test?userId=12345678&userName=Test%20User"
                className="text-primary hover:underline"
              >
                /dashboard-test?userId=12345678&userName=Test%20User
              </a>
            </li>
            <li>
              <a 
                href="/dashboard-test?userId=87654321"
                className="text-primary hover:underline"
              >
                /dashboard-test?userId=87654321
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Testing Notes:</p>
          <ul className="space-y-1 text-yellow-700 list-disc list-inside">
            <li>Make sure backend is running at http://localhost:8000</li>
            <li>User ID should exist in database (or API will return 404)</li>
            <li>If backend is not running, you'll see error states</li>
            <li>If user has no data, you'll see empty states</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

