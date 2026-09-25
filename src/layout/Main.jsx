import {
  Outlet,NavLink
} from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'
import { CheckLine, List, ListChecks, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui'

const Sidebar = () => {
  const { open,toggle } = useSidebar()
  const {logout} = useAuth()

    return (
    <aside  className= {`bg-white dark:bg-slate-900 fixed  top-0 bottom-0 left-0 z-20 w-64  dark:text-slate-300 md:block ${open ? "block":"hidden"}`}>
      <button onClick ={toggle} className="text-slate-609 hover:text-slate-700 md:hidden absolute top-2 right-6 transition-colors hover:bg-slate-100 rounded-md px-4 py-2 ">X</button>
      
      <div className='h-24 border-b border-slate-200 dark:bg-slate-700 dark:border-slate-600 bg-slate-100'>

      </div>
      <ul className="flex-col flex dark:text-slate-300 gap-4 text-xs w-full px-2 py-8 text-slate-800">
          <NavLink to="/todo" >
          {({ isActive}) => (
              <li className={` rounded-lg flex items-center gap-4
               dark:hover:bg-slate-600 hover:bg-slate-100
                hover:text-slate-900 
                   w-full
                  transition-all px-4 py-3 round-xl 
                     ${isActive ? "text-slate-900 dark:text-slate-100 dark:bg-slate-600 bg-slate-100 " : ""}`}>
                <ListChecks className='w-5 h-5' /> Todo </li>
          )}
              </NavLink>
     
      <NavLink to = "/profile">  <li className="text-sm flex items-center gap-4 hover:bg-slate-100 hover:text-slate-900 rounded-lg active:text-slate-800 dark:active:bg-slate-600 dark:active:text-slate-100 active:bg-slate-100 w-full transition-all px-4 py-3 round-xl ">
<User className='w-5 h-5' />
Profile

        
        
</li> </NavLink>    
      </ul>
        <div className=' dark:bg-slate-700 dark:border-slate-600 fixed bottom-0 left-0 w-64 bg-slate-100  p-4'>
          <Button variant="ghost" size="sm" className="bg-rose-600 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-transparent text-white font-semibold" onClick={logout}> Logout <LogOut className='ml-2 w-4 h-4' /> </Button>
        </div>
    </aside>


  )

}




const MainLayout = ()=>
{

  return (
    <div className="flex  bg-slate-50 dark:bg-slate-800 min-h-screen overflow-x-hidden dark:text-slate-300">

      <Sidebar />
      <main className = "flex-1 py-24 px-8 md:ml-64 min-w-0 ">
        <Outlet />
      </main>
    </div>

  )
}

export default MainLayout