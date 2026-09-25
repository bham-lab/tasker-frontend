import {
  useTheme
} from '../context/ThemeContext'
import {
  NavLink,
  useNavigate
} from "react-router-dom"
import {
  useAuth
} from '../context/AuthContext'

import {
  useToast
} from '../context/ToastContext'
import { useSidebar } from "../context/SidebarContext"

import menu from '../assets/Menu.svg'
import sun from '../assets/Sun.svg'
import moon from '../assets/Moon.svg'
import { NotificationBell } from './NotificationBell'


export default function Header() {

  const {
    user,
    logout
  } = useAuth()

  const {
    theme,
    toggleTheme
  } = useTheme()
  const {
    setToast
  } = useToast()
const { toggle } = useSidebar()


  return(
    <header className={`fixed top-0 left-0 ${user &&("md:left-64")} right-0 px-4 py-2 flex items-center justify-between z-10 dark:bg-slate-900 bg-white border-b border-slate-200 dark:border-slate-600 mb-8 dark:text-slate-300`}>
      <button className="h-8 w-8 md:hidden rounded-lg flex items-center justify-center dark:bg-slate-500" onClick={toggle}> 
        <img src={menu} alt="menu" className= "w-5 h-5"/>
    </button>
    <ul className="flex items-center gap-4 text-xs uppercase  tracking-wider active:text-blue-400">   
      <li><NavLink to="/" end>Home</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      
    </ul>

   
    <button className="h-8 w-8 rounded-lg flex items-center justify-center " onClick={toggleTheme}><img src={theme === "light" ? moon : sun } alt ="theme" className="w-5 h-5"/></button>
      {user && <NotificationBell />
      }
  </header>
)
}