import { useEffect } from "react"
import { Button } from "./Button";
import { X } from "lucide-react";


const SIZE = {
   sm: "max-w-sm",
   md: "max-w-md",
   lg:"max-w-lg",
   xl: "max-w-xl",
  "2xl": "max-w-2xl"
}



export const Modal = ({isOpen, onClose,title,size="md", children}) => {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" || e.key === "Enter") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);



if(!isOpen) return null;

 return(
     <div className="fixed inset-0 bg-black/40   z-50 flex items-center justify-center " onMouseDown={onClose}>

  
         <div className={` bg-white ${SIZE[size]}  dark:bg-slate-800 shadow-2xl  rounded-xl  p-5 `} onMouseDown={(e) => e.stopPropagation()}
   >
     
        <div className=" flex items-center justify-between">
                 {title && (<div>
            <h1 className="text-slate-800 dark:text-slate-200 text-sm font-semibold capitalize">{title}</h1>
            
        </div> )}
        <Button variant="neutral" size="sm" onClick={onClose} className="self-end "> <X className="w-4 h-4 " /></Button>
                 </div>
    
     <div className="p-2">
        {children}
     </div>
    </div>
     </div>
 )

}