import { io } from "socket.io-client"



let socket = null

export const connectSocket = (token) => {
    if(socket?.connected) return socket

    socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") ,{
        auth: {token},
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        transports: ["websocket", "polling"],

    })


    socket.on("connect", () => {
        console.log("Socket connected: ", socket.id)
    })

    socket.on("connect_error", (err) => {
        console.error("Socket connection error: ", err.message)
    })
    socket.on("disconnect", (reason) => {
        console.log("Socket disconnected: ", reason)
    })
return socket

}


export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect()
        socket = null
    }
}

export const getSocket = () => socket