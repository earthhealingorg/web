import { useEffect, useRef, useState } from "react"

export const useFakeQuery = () => {
  const timerRef = useRef<NodeJS.Timer>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    timerRef.current = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timerRef.current)
  }, [])
  return { isLoading }
}
