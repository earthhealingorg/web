import { useEffect, useState } from "react"

export function useClientLoadingState(...queries: { isLoading: boolean }[]) {
  const isClientReady = useIsClientReady()
  const isLoading = queries.some((q) => q.isLoading)
  return !isClientReady || isLoading
}

export function useIsClientReady() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsReady(true)
    }
  }, [])
  return isReady
}
