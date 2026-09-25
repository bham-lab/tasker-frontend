import {
  useState,
  createContext,
  useContext
} from 'react'

const SidebarContext = createContext(null)

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error(
      "useSidebar must be used within SidebarProvider"
    )
  }

  return context
}