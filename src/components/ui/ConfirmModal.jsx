import { AlertTriangle } from "lucide-react"
import { Modal } from "./Modal"
import { Button } from "./Button"



export const ConfirmModal = ({
isOpen,onClose,title,onConfirm, loading,message
})  => (
    
<Modal
isOpen={isOpen}
onClose={onClose}
title={title}
size="sm"
>
    <div className="space-y-6">
        <div className="flex items-start gap-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
                <AlertTriangle className="h-5 w-5 text-red-600"/>
            </div>

            <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Confirm deletion
                </p>
                <p className="mt-1 text-slate-500  dark:text-slate-400 text-sm">
                    {message}
                </p>
            </div>
        </div>
        <div className=" flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}> Cancel</Button>
             <Button variant="danger" size="sm" onClick={onConfirm} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
             </Button>
        </div>
    </div>
</Modal>     
)