import { Minus, MoveLeft, MoveRight, Plus } from "lucide-react"
import EmptyState from "../EmptyState"


export const Table = ({columns, data,pagination, page, setPage}) => {
  
return(
    <div className="p-4 overflow-x-auto rounded-xl border max-w-full border-slate-200 dark:border-slate-600">
        <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-slate-100 dark:bg-slate-700/40 dark:border-slate-600 border-b border-b-slate-200  ">
                <tr>
                    {columns.map((column) => (
                        <th key={column.key} className=" text-xs px-6 uppercase tracking-widest py-4 text-left font-semibold dark:text-slate-300 text-slate-600 ">
                          {column.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-200  dark:divide-slate-900/50 ">
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="px-6 py-10 text-center text-slate-500"
                        >
                            <EmptyState />
                        </td>
                    </tr>
                ):(
                       
                            data.map((row, index) => (

                                <tr key={row.id ?? index} className="hover:bg-slate-100 dark:hover:bg-slate-600/20">
                                   {columns.map((column) => (
                                       <td key={column.key}  className="px-6 py-3 text-left max-w-[250px] " style={{ minWidth: column.width }}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                   ))}
                                </tr>
                            )) )

                        }
                      
                
            </tbody>
        </table>
    { pagination && (<Pagination pagination={pagination} page={page} setPage={setPage}  />)}
    </div>
)

}


const Pagination = ({ pagination,page,setPage }) => {
  

    return( 
    <div className="mt-6">

    
    <div className="w-full flex justify-between items-center">
                <button disabled={!pagination.hasPrev} onClick={() => setPage(pagination.page - 1)} className=" dark:bg-slate-900/40 dark:to-blue-700  bg-slate-300 flex text-xs gap-2 items-center text-blue-700 disabled:opacity-50 py-2 px-4 rounded-md  hover:text-slate-800">
                    <MoveLeft className="h-3 w-3" />  Prev 
        </button>
        <div className="text-xs flex items-center gap-2 ">
                    <button disabled={!pagination.hasPrev} onClick={() => setPage(pagination.page - 1)} className=" dark:bg-slate-900/40  hover:bg-slate-300 disabled:opacity-50 py-2 px-2 rounded-md text-slate-600 hover:text-slate-800">
                    <Minus disabled={!pagination.hasPrev} onClick={() => setPage(pagination.page - 1)} className="h-3 w-3" /> 
                       </button>
                        {page}
                        
                    <button disabled={!pagination.hasNext} onClick={() => setPage(pagination.page + 1)} className=" dark:bg-slate-900/40  hover:bg-slate-300 py-2 px-2 rounded-md disabled:opacity-50 text-slate-600 hover:text-slate-800">
                         <Plus className="h-3 w-3" disabled={!pagination.hasNext} onClick={() => setPage(pagination.page + 1)} /> </button>
        </div>
                <button disabled={!pagination.hasNext} onClick={() => setPage(pagination.page + 1)}  className=" dark:bg-slate-900/40  bg-slate-300 flex text-xs gap-2 items-center text-blue-700 py-2 px-4 rounded-md disabled:opacity-50  hover:text-blue-800">
           Next <MoveRight   className="h-3 w-3" />
        </button>
    </div>
    <p className="text-xs text-slate-700 dark:text-slate-400   italic mt-1
     ">page {page} out of {pagination.totalPage}</p>
        </div>)
}