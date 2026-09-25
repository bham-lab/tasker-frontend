


export const StatCardSkeleton =() => {
    return(
    <div className="bg-white  rounded-xl p-6 border dark:bg-slate-800 dark:border-slate-600 border-slate-200  flex justify-between gap-4 ">
     <div className="space-y-6"> 
      <div className="bg-slate-200  rounded-lg   h-6 w-36 animate-pulse ">
       
      </div>
        <div className="bg-slate-200 rounded-lg   h-4 w-16 animate-pulse " >

      </div>
            </div>
            <div className="bg-slate-200  rounded-lg  h-12 w-12 animate-pulse "> </div>
       
    </div>)
}