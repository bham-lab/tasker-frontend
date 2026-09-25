import { createContext, useContext, useEffect, useState } from "react";
import { useAuth} from "./AuthContext"
import { connectSocket, disconnectSocket } from "../../config/socket";


const SocketContext = createContext(null)


export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [connected, setConnected] = useState(false)
    const {user} = useAuth()

    useEffect(() => {
        if(!user) {
            disconnectSocket()
            setSocket(null)
            setConnected(false)
            return
        }

        const token = localStorage.getItem("token")
        const s = connectSocket(token)

        if (!s) {
            console.error("Failed to create socket connection")
            setSocket(null)
            setConnected(false)
            return
        }

        s.on("connect", () => setConnected(true))
        s.on("disconnect", () => setConnected(false))
     
        setSocket(s)

        return () => {
            s.off("connect")
            s.off("disconnect")
        }
    }, [user])

    return (
        <SocketContext.Provider value={{socket, connected}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error("useSocket must be inside SocketProvider")
        return context
}