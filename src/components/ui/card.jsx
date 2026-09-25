


export const Card = ({number,label, icon:Icon, color,bg}) => {
    
    return(
        <div className="bg-white overflow-x-hidden rounded-xl p-6 border dark:bg-slate-900/50 dark:border-slate-800 border-slate-200  flex justify-between gap-4 "> 
            <div>
                <h1 className="text-3xl  font-semibold mb-4 text-slate-900 dark:text-slate-200">{number}</h1>
                <span className="text-xs text-slate-500  dark:text-slate-400">{label}</span>
            </div>
          <div className ={`  ${bg}   h-12 w-12 rounded-md flex justify-center items-center `}>
                <Icon className={` ${color} w-8 h-8  `}/>

          </div>
          
        </div> 
    )
}