import './App.css'
import {
  Routes,
  Route
} from 'react-router-dom'

import Toast from './components/Toast'
import Header from './components/Header'
import { useTheme } from './context/ThemeContext'

import Todo from './pages/Todo'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectdRoute'
import MainLayout from './layout/Main'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import Profile from './pages/Profile'
import TodoDtail from './pages/TodoDetail'
import SignUpPage from './pages/SignUpPage'

import { TodoProvider } from './context/TodoContext'
import { SocketProvider } from './context/SocketContext'
import { ConnectionStatus } from './components/ConnectionStatus'

function App() {
  const { theme } = useTheme()

  return (
    <SocketProvider>

      <ConnectionStatus />

      <div className={theme === "dark" ? "dark" : ""}>

        <Header />

        <Toast />

        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>

            {/* TodoProvider */}
            <Route
              element={
                <TodoProvider>
                  <MainLayout />
                </TodoProvider>
              }
            >

              <Route path="/todo" element={<Todo />} />

              <Route path="/profile" element={<Profile />} />

              <Route
                path="/detail/:id"
                element={<TodoDtail />}
              />

            </Route>

          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

    </SocketProvider>
  )
}

export default App