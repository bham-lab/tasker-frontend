import { useTodo } from "../context/TodoContext"
import { Tab } from "./ui/tab"

const tabs = ["all","completed", "active"]

export const TodoFilter = () =>{

    const {filter,setFilter, } = useTodo()

 return (
    <Tab tabs={tabs} setFilter={setFilter} filter={filter}/>
 )
}