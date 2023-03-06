import { useEffect, useState } from "react"

export function useIsClientReady() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsReady(true)
    }
  }, [])
  return isReady
}
