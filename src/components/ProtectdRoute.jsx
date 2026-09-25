// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Logged in → render the child route
  return <Outlet />
}

export default ProtectedRoute