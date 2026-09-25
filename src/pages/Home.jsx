import { useAuth} from '../context/AuthContext'
import { Navigate } from 'react-router-dom'



export default function Home () {
const {user} = useAuth()


if(user) return (<Navigate to ="/todo" replace/>)

  return(
    <div className="bg-white flex flex-col justify-center min-h-screen  dark:bg-slate-800 items-center ">

      <h1 className="text-xl font-bold lg:text-3xl dark:text-slate-200 text-slate-900"> To Do Apps</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        List your task and track your progress
      </p>

    </div>

  )
}









