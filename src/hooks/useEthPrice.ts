import { useQuery } from "@tanstack/react-query"

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
