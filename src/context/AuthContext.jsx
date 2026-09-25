import {
  useContext,
  createContext,
  useState,
  useEffect, useCallback
} from 'react'

import { authService } from "../../services/authServices"
const AuthContext = createContext(null)



export const AuthProvider = ({
  children
}) => {
  const [ user,
    setUser ] = useState(null)
  const [ message,
    setMessage ] = useState("")

  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const initAuth = async () => {

      const token = localStorage.getItem("token")
      
       
      if (!token) { setLoading(false); return; }


       const {user} = await authService.getMe()
       setUser(user)
      try { }
      catch (err) { localStorage.removeItem("user"); localStorage.removeItem("token"); setUser(null) } finally { setLoading(false) }
    }



    initAuth()
  }, [])



    const login = async (data) => {
      const result = await authService.login(data)
      // Save token to localStorage for the interceptor
      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user)
      return result
    }


  const register = async (data) => {
    const { result } = await authService.register(data)
    setUser(result.user)
    localStorage.setItem('token', result.token)
    localStorage.setItem('user', result.user)
    return u
  }






  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("users")
    localStorage.removeItem('token')
  }, [])


  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user,user, login, signUp: register, logout, loading }}>   {children}

    </AuthContext.Provider>
  )

}


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be used under AuthProvider')
  }

  return (context)
}