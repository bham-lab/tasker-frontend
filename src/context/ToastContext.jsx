import {
  useState,
  createContext,
  useContext
} from 'react'


const ToastContext = createContext(null)


export const ToastProvider = ({
  children
}) => {
  const [toast,
    setToast] = useState(null)

  return (
    <ToastContext.Provider value={ { toast, setToast }}>
      {children}
    </ToastContext.Provider>
  )

}


export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be inside ToastProvider")}
  return context
}