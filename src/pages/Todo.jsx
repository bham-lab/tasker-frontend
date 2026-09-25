import { useCallback, useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'

import { Button, Card, ConfirmModal, Modal,Table } from '../components/ui'
import {
  useAuth
} from '../context/AuthContext'
import { useTodo } from '../context/TodoContext'

import {
  ListTodo,
  CircleCheck,
  CalendarDays,
  Clock3,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCheck,

} from "lucide-react";
import { StatCardSkeleton } from '../components/ui/StatCardSkeleton'
import { TodoSkeleton } from '../components/ui/TodoSkeleton'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/date'
import { useToast } from '../context/ToastContext'
import { TodoSearch } from '../components/TodoSearch'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { TodoFilter } from '../components/TodoFilter'


export default function Todo() {

  const {
    user,
    logout
  } = useAuth()

  const {setToast} = useToast()


  const [isModalOpen, setIsModalOpen] = useState(false)

 const [todoToDelete, setTodoToDelete] = useState(null)

  const { stats, loading, todos,toggleTodo,pagination,fetchTodo, deleteTodo,setEdit } = useTodo()

  const [page , setPage] = useState(1)

  const loadMore = useCallback(() => {
    if(!pagination?.hasNext) return
    fetchTodo({page: pagination.page + 1})

  }, [pagination, fetchTodo])


  const lastItemRef = useInfiniteScroll(
    loadMore, pagination?.hasNext ?? false
  )
 useEffect(() => {
  fetchTodo({page: page})
 },[page, fetchTodo])


  const handleDelete = async (id) => {
    if(!id){
      setToast({value: "Id is required for deletion", type:"error"})
      return
    }
    await deleteTodo(id)
    setTodoToDelete(null)
  }


  const columns =  [
    {key: "task" , label: "Task", width:"250px", 
      render: (todo,idx) => {
        const isLast = idx === todos.length -1
        return ( 
        <p ref={isLast ? lastItemRef : null} className='text-sm  text-slate-600  dark:text-slate-400 truncate '>{todo.text}</p>
   ) }
     },
     {key: "completed" , label: "Status",
      render: (todo) => (
     <span className={`text-xs rounded-full px-3 py-1 ${todo.completed ? "bg-emerald-100 dark:bg-emerald-900/40  text-emerald-600":"text-blue-600 dark:bg-blue-900/20 bg-blue-100"}`}>{todo.completed ? "completed" :"active"}</span>
      )
     },
    {
      key: "createdAt", label: "Date", width: "250px",
      render: (todo) => (
        <p className='text-xs text-slate-500'> {formatDate(todo.createdAt)}</p>
      )
     },
     {key: "actions", label:'',
      render: (todo) => (
        <div className='flex items-center gap-4'>
          <span className="text-xs  text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-sm p-1  font-bold " onClick={() => {setEdit(todo);setIsModalOpen(true)}}><Pencil className='w-3 h-3'/></span>
          <span className="text-xs text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/20 p-1 rounded-sm font-bold " onClick={() => setTodoToDelete(todo)}><Trash2 className='w-3 h-3' /></span>
          <span className="text-slate-500" onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? <X className='w-3 h-3' /> : <CheckCheck className='w-3 h-3' />}</span>
          <Link to={`/detail/${todo.id}`} > <p className='text-xs  whitespace-nowrap  text-slate-700 dark:text-slate-400 hover:text-slate-900'>View Details</p></Link>

        </div>
      )

      
     }
  ]


  return (
    <main className="space-y-6">
       <div className='flex justify-between gap-4 sm:items-center sm:flex-row flex-col'> 
     
      <div className="">
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold  text-slate-900 mb-1 dark:text-slate-100  ">Well come Mr.{user.name} for our To do app</h2> <p className="text-xs text-slate-500 dark:text-slate-200 ">List what to do and tracking your progress digitally     </p>  </div> 
        <Button size="sm" onClick= {() => setIsModalOpen(true)}> <Plus className='w-4 h-4 mr-2' />Add todo</Button></div>
      {loading && (<>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className='space-y-4'> 
       <TodoSkeleton />
        <TodoSkeleton />
        <TodoSkeleton />
          <TodoSkeleton />
          </div>
      </>
      ) }


<>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card number={stats.total} label="Total" icon={ListTodo} color="text-blue-500 dark:text-blue-800" bg="bg-blue-50 dark:bg-blue-900/20" />
        <Card number={stats.completed} label="Completed" icon={CircleCheck} color="text-emerald-500 dark:text-emerald-800" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <Card number={stats.pending} label="Pending" icon={Clock3} color="text-amber-500 dark:text-amber-800" bg="bg-amber-50 dark:bg-amber-900/20" />
        
        <Card number={stats.thisWeek} label="this week" icon={CalendarDays} color="text-purple-500" bg="bg-purple-50 dark:bg-purple-900/20" />
      </div>
            <TodoSearch />
        <TodoFilter />
        {(loading ? (<div className='space-y-4'>
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </div>): (
              <> 
              
            <Table columns={columns} data={todos} pagination={pagination} page ={page} setPage={setPage} />
            </> )
        )} </>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Todo">
<TodoForm />
            </Modal>

            <ConfirmModal loading={loading} isOpen={!!todoToDelete} onClose={() => setTodoToDelete(null)} onConfirm={() => handleDelete(todoToDelete.id)} message={`Are you sure you want to delete "${todoToDelete?.text}"?`} title="Confirm Delete" />
    </main>
  )
}