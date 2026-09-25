




export function Input({ className = " ", error, ...props }) {

  return (


    <input className={` rounded-md text-xs outline-none py-2.5 px-4 focus:ring-2 border w-full   
      ${error ? " focus:border-red-600 focus:ring-red-200 border-red-200 " 
        : "focus:border-blue-400 dark:border-slate-600 focus:ring-blue-200 border-slate-200   "}${className}`} {...props} />



  )

}