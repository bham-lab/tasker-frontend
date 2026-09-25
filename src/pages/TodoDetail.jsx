import {useTodo} from '../context/TodoContext'
import {useParams, Link} from 'react-router-dom'



export default function TodoDetail () {

const {id} = useParams()
const {todos} = useTodo()


const todoDetail = todos.find(t=> t.id === Number(id))


return (
<div className="space-y-6">   <Link to="/todo" className="text-sm text-slate-600 hover:text-slate-700 transition-colors">Back to list</Link>  <div className= "divided-y  divided-slate-200 bg-white rounded-xl px-8 py-6 shadow-sm ">       


<div className="text-sm text-slate-800 font-bold"> id: #   </div> <p className="text-xs text-slate-500">text:  {todoDetail.text} </p>


</div>





</div>

)
}