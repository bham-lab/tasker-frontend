import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  Children
} from "react"
import { useToast } from './ToastContext'
import { todoService } from "../../services/TodoService.js"

import { useSocket } from "./SocketContext.jsx"

// ---------------- CONTEXT ----------------

const TodoContext = createContext(null)

// ---------------- PROVIDER ----------------

export const TodoProvider = ({
  children
}) => {

  const [ todos, setTodos ] = useState([]);
  const [ pagination, setPagination ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ filter, setFilter ] = useState("all");
  const [ edit, setEdit ] = useState(null)
  const { setToast } = useToast()
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    thisWeek: 0,
    pending: 0,
  });

const {socket} = useSocket()



  const fetchTodo = useCallback(async (params = {}) => {
    setLoading(true);
    
    try {
      const completed = filter === "all" ? undefined
        : filter === "completed" ? true
          : false

      const { todos, pagination } = await todoService.getAll({ ...params, ...(completed !== undefined && { completed }) })
      setTodos(todos)
      setPagination(pagination)
     
     
    } catch (err) { setToast({ value: err.message, type: "error" }) } finally { setLoading(false) }
  }, [filter])

  const getStats = useCallback(async () => {
    try {
      const { stats } = await todoService.getStats()
      setStats(stats)
    } catch (err) {
      setToast({
        value: err.response?.data?.message || err.message,
        type: "error",
      })
    }
  }, [])


  
  useEffect(() => {
    fetchTodo()
    getStats()
  }, [fetchTodo, getStats])



  // Add or update todo
  const addTodo = async (text) => {

    try {
      if (edit) {
        await todoService.update(edit.id, {text})

        setToast({ value: "updated successful", type: "success" })

        setEdit(null)

      } else {

        await todoService.create(text)
        setToast({ value: "Created successful", type: "success" })
      }
      await fetchTodo()
      await getStats()
    } catch (err) { setToast({ value: err.message, type: "error" }) }
  }

  const deleteTodo = async (id) => {
    const previous = todos
    setTodos(prev => prev.filter(p => p.id !== id))
    try {
      await todoService.delete(id)
      setToast({ value: "deleted successful", type: "success" });
      await getStats()
    } catch (err) {
           setTodos(previous)
      setToast({ value: err.message, type: "error" })
      
      await getStats()
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)

    const newCompleted = !todo.completed
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed:newCompleted} : t))

    try {
     

      await todoService.update(id, { completed: !todo.completed })
      await getStats()
    
    } catch (err) { setToast({ value: err.message, type: "error" });
      setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: todo.completed } : t))
     
  }
  }


useEffect(() => {
  if (!socket) return

  

  const onCreated = (newTodo) => {
    console.log("🔥 todo:created received:", newTodo)
    setTodos(prev => [newTodo, ...prev])
    getStats()
  }

  const onUpdated = (updatedTodo) => {
    setTodos(prev => prev.map(t => t.id === updatedTodo.id? updatedTodo : t))
    getStats()
  }
  
  const onDeleted = ({id}) => {
    setTodos(prev => prev.filter(t => t.id !== id))
    
    getStats()
  }

  socket.on("todo:created", onCreated)
  socket.on("todo:updated", onUpdated)
  socket.on("todo:deleted", onDeleted)
 
  return () => {
   
    socket.off("todo:created", onCreated)
    socket.off("todo:updated", onUpdated)
    socket.off("todo:deleted", onDeleted)
  }
}, [socket , getStats])


  return (
    <TodoContext.Provider
      value={{
        todos,
        stats,
        loading,
        filter,
        edit,
        setEdit,
        addTodo,
        fetchTodo,
        deleteTodo,
        toggleTodo,
        setFilter,
        pagination, 
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// ---------------- HOOK ----------------

export const useTodo = () => {

  const context = useContext(TodoContext)

  if (!context) {
    throw new Error(
      "useTodo must be used inside TodoProvider"
    )
  }

  return context
}