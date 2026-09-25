import {
  useTodo
} from '../context/TodoContext'
import { Link } from 'react-router-dom'


export default function TodoItem() {
  const {
    todos,
    deleteTodo,
    toggleTodo,
setEdit
  } = useTodo()


  const handleDelete = async (id) => {
  console.log("id :", id)
 
   
    await deleteTodo(id)
  }



  return(
    <ul className="flex flex-col gap-6">
      {todos.map((todo, i) => (
      <li key={i} className={`flex items-center justify-between px-4 py-3 gap-3 rounded-xl border border-slate-200 dark:border-slate-400 hover:bg-slate-100 group  ${todo.completed? "opacity-50":""} `}  style={ {
            textDecoration: todo.completed ? "line-through": "none"
          }}>
<Link to={`/detail/${todo.id}`} className="flex-1">  

          <p className=" text-sm dark:text-slate-100 text-slate-600 group-hover:text-blue-600 ">
            {todo.text}
          </p>
</Link>
          <span className="text-xs text-amber-600 bg-amber-50 rounded-sm px-2 py-1 font-bold " onClick={()=>setEdit(todo)}>edit</span>
          <span  className="text-xs text-rose-600 bg-rose-50 rounded-sm px-2 py-1 font-bold "  onClick={()=> handleDelete(todo.id)}>Delete</span>
          <span className="text-green-500" onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? "x": "✓"}</span>

        </li>     
      ))}

    </ul>
  )
}