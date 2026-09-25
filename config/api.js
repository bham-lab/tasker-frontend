import axios from "axios"

const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-type": "Application/json"
  }


})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config
  }, (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.error || "Something went wrong"

    if (status === 401) { localStorage.removeItem("token"); localStorage.removeItem("users"); window.location.href = "/login"; return Promise.reject(error) }

    if (status === 403) { return Promise.reject(new Error("You don't have permission")) }

    if (status === 422) { return Promise.reject(error) }


    if (status >= 500) { return Promise.reject(new Error("Server error - try again later")) }
  
    console.error("Backend error:", error.response?.data)
    console.error("Status:", status)
    console.error("URL:", error.config?.url)
    Promise.reject(new Error(message))
    return Promise.reject(new Error(message))
  }

)



export default api 