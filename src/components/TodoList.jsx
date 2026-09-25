import {
  useState
} from 'react'

import {
  useTodo
} from '../context/TodoContext'

import TodoItem from './TodoItem'

import EmptyState from './EmptyState'

export default function TodoList() {

  const {
    todos,
    filter,
    setFilter
  } = useTodo()




  return (
    <main className="space-y-4">

      <div className="overflow-y-auto max-h-[50vh]  dark:bg-slate-700 bg-white px-6 py-4 rounded-xl">
        {todos.length === 0 ? <EmptyState /> : <TodoItem />}
      </div>

      <div className="flex mt-12 text-xs items-center justify-between gap-4  uppercase tracking-wider dark:text-slate-200 text-slate-600 font-semibold  "> 
         <div className={`active:border-b-2 border-blue-600 rounde-xl transition-all ${filter === "all" ? "border-b-2 border-blue-600" : ""}`} onClick={() => setFilter("all")}>All</div> 
         <div className={`active:border-b-2 border-blue-600 rounde-xl transition-all ${filter === "completed" ? "border-b-2 border-blue-600" : ""}`} onClick={() => setFilter("completed")}>
          Completed</div> 
          <div className={`active:border-b-2 border-blue-600 rounde-xl transition-all ${filter === "active" ? "border-b-2 border-blue-600" : ""}`} onClick={() => setFilter("active")}>Active</div> 
           </div>
    </main>

  )
}