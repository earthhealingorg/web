import { useQuery } from "@tanstack/react-query"

import { usePspToEthRatio } from "@/hooks/useReads"

export function useEthPrice() {
  return useQuery(["token-price", "eth"], {
    queryFn: async () => {
      const result = await fetch(
        "https://coins.llama.fi/prices/current/coingecko:ethereum"
      )
      const response = await result.json()
      return response?.coins?.["coingecko:ethereum"]?.price
    },
  })
}

export function usePspPrice() {
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const { data: pspToEthRatio, ...pspToEthRatioQuery } = usePspToEthRatio()
  return {
    data: ethPrice * pspToEthRatio,
    isLoading: ethPriceQuery.isLoading || pspToEthRatioQuery.isLoading,
  }
}
