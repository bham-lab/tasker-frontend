import { useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { useTodo} from "../context/TodoContext"
import { Search } from "lucide-react"
import { Input } from "./ui"

export const TodoSearch = () => {
    const [query, setQuery] = useState("")
    const debounced = useDebounce(query)
    const { fetchTodo } = useTodo()
    
    useEffect(() => {
        if (!debounced.trim()) return
        fetchTodo({ text:debounced.trim() || undefined})
    }, [debounced,fetchTodo])
  
    return(
        <div className="relative ">
            <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3" />
    <Input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-xl pl-10" />
        </div>
    )
}