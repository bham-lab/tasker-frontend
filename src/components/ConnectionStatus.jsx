import { WifiOff } from "lucide-react"
import { useSocket } from "../context/SocketContext"


export const ConnectionStatus = () => {
    const {connected} =  useSocket()

    if (connected)  return null

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500 text-white px-4
        py-2 rounded-full text-xs whitespace-nowrap font-semibold shadow-lg z-50 animate-bounce">
            <WifiOff className="w-4 h-4" />
            Connection lost - reconnecting...
        </div>
    )
}