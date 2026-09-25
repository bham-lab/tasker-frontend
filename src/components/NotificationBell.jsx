import { useEffect, useState } from "react"
import { useSocket } from "../context/SocketContext"
import { Bell } from "lucide-react"
import { formatDate } from "../utils/date"



export const NotificationBell = () => {
   
    const { socket } = useSocket()
  const [notifs , setNotifs] = useState([])
const[isOpen, SetIsOpen] = useState(false)
const [count, setCount] = useState(0)

    useEffect(() => {
        if (!socket) return

        const onNotification = (data) => {
            setNotifs(prev => [{ ...data, read: false, id: Date.now() }, ...prev])
            setCount(prev=> prev + 1)
        }

        // Listen for various notification types
        socket.on("todo:created", onNotification)
        

        return () => {
            socket.off("todo:created", onNotification)
            socket.off("notification:new_user", onNotification)
        }
    }, [socket])

const markAllRead =() => {
    setNotifs(prev => prev.map(n => ({...n, read: true})))
    setCount(0)
}


    return(
        <div className="relative max-w-[300px]" >
            <button className="relative p-2 rounded-full " onClick={() => { SetIsOpen(!isOpen);  markAllRead()}}>
                <Bell className = "w-5 h-5 text-slate-600"/>
               {count > 0 && ( <span className="absolute flex items-center justify-center rounded-full -top-1 -right-1 w-5 h-5 animate-pulse text-xs bg-red-500 text-white " >{count > 9 ? "9+" : count}</span> )
          } </button>
            {isOpen && (
                <div className="absolute right-2 top-14 bg-white dark:bg-slate-800 p-2 rounded-xl border dark:border-slate-700 border-slate-200">
                    <div className="text-slate-900 dark:text-slate-200 font-bold px-4 py-3 text-center border-b dark:border-slate-500 border-slate-200
                    ">Notification
                        </div>
                        { notifs.length === 0 ? ( 
                      <p className="px-4 dark:text-slate-400 whitespace-nowrap py-6 text-center text-sm text-slate-400"> No notifications yet</p>
                        ) : ( 
                      <ul className="max-h-64 overflow-y-auto"> 
                        {notifs.map(n => (
                            <li key={n.id} className={`text-xs whitespace-nowrap dark:text-slate-400 dark:border-slate-600 border-b px-4 py-3 border-slate-200 bg-transparent   ${n.read ? "text-slate-600" : " dark:bg-blue-900/20 dark:text-blue-100 bg-blue-50 text-blue-500"}`}>
                              { n.text} is created at {formatDate(n.createdAt)}
                            </li>
                        ))}
                </ul>)}
                    </div>
            )}
        </div>
    )
}