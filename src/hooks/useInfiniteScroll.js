import { useCallback, useEffect, useRef } from "react"


export const useInfiniteScroll = (callback, hasMore) => {
    const observerRef = useRef(null)

    const lastElementRef = useCallback((node) => {
        if (!node) return
  

    if (observerRef.current) observerRef.current.disconnect()

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                callback()
            }
        }, {threshold: 0.1})

        observerRef.current.observe(node) }, [callback, hasMore] )


        useEffect(() => {
            return () => observerRef.current?.disconnect()
        },[])

        return lastElementRef
}