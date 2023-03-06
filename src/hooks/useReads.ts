import { Address, useAccount, useBalance } from "wagmi"

import { useFakeQuery } from "@/hooks/useFakeQuery"

export function useUserBalance({ address: token }: { address: Address }) {
  const { address, isConnected } = useAccount()
  return useBalance({ address, token, enabled: isConnected })
}

export function usePspToEthRatio() {
  const query = useFakeQuery()
  return { ...query, data: 0.6 }
}

export function useTotalDeposited() {
  const query = useFakeQuery()
  return { ...query, data: "420 stETH" }
}
