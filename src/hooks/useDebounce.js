import { useState, useEffect } from "react"

export const useDebounce = (value, delay = 400) => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)   // clear on every new keystroke
    }, [value, delay])

    return debounced
}