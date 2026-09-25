// Toast.jsx

import {
  useEffect
} from 'react'
import {
  useToast
} from '../context/ToastContext'

export default function Toast() {
  const {
    toast,
    setToast
  } = useToast()

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  },
    [toast])

  if (!toast) return null

  return (
    <div className={`bg-slate-900 rounded-md text-xs px-4 py-3 ${toast.type === "error "?  "text-rose-500":"text-green-500"} z-20 fixed top-8 right-4 `}>
      <p>

      <span className={`mr-2 px-1.5 py-1 rounded-full text-white font-bold ${toast.type === "error" ? "bg-rose-500  ": "bg-green-500"}`}> {toast.type==="error"? "X":"✓"}</span> {toast.value}
      </p>
      
    </div>
  )
}