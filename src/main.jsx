import {
  StrictMode
} from 'react'
import {
  createRoot
} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  ToastProvider
} from './context/ToastContext'
import {
  ThemeProvider
} from './context/ThemeContext'

import {
  AuthProvider
} from './context/AuthContext'

import {
  BrowserRouter
} from 'react-router-dom'

import { SidebarProvider } from './context/SidebarContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
          
        
           
             <SidebarProvider>   
              <App />
</SidebarProvider>
            
          
           
        </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
     
    </BrowserRouter>
  </StrictMode>
)