import { useIsClientReady } from "@/hooks/useIsClientReady"

export function useClientLoadingState(...queries: { isLoading: boolean }[]) {
  const isClientReady = useIsClientReady()
  const isLoading = queries.some((q) => q.isLoading)
  return !isClientReady || isLoading
}
