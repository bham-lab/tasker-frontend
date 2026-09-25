
const VARIANTS = {
  primary: "bg-blue-500 text-white dark:bg-blue-800 ",
  secondary: "bg-amber-500 text-white dark:bg-amber-800",
  ghost: " border border-slate-200 dark:border-slate-600",
  danger: "bg-red-500 text-white dark:bg-red-800",
  neutral: "bg-transparent  text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-900/40 hover:text-slate-700"
}

const SIZE = {
  lg: "px-6 py-4 text-sm",
  md: "px-4 py-2.5 text-xs",
  sm: "px-3 py-1 text-xs"

}
export function Button({ children, variant = "primary", size = "md", className, ...props }) {

  return (

    <button type="button" className={`inline-flex shrink-0 items-center justify-center px-4 py-2.5 text-xs rounded-md  disabled:opacity-60 ${VARIANTS[ variant ]} ${SIZE[ size ]} ${className}`} {...props}> {children} </button>






  )
}