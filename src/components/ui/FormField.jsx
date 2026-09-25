




export function FormField({ children, required = false, label, error }) {


  return (

    <div className="flex flex-col gap-1">   <label className="text-xs font-semibold text-slate-700 dark:text-slate-300  capitalize">{label}{required && (<span className="text-sm text-red-500 ml-0.5">*</span>)} </label>

      {children}


      {error && (<p className="text-xs text-red-500">{error}</p>)}

    </div>




  )

}