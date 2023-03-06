import { Address, useAccount, useBalance } from "wagmi"

import { useIsClientReady } from "@/hooks"

type UseUserBalanceArgs = {
  address: Address
}

export function useUserBalance({ address: token }: UseUserBalanceArgs) {
  const { address, isConnected } = useAccount()
  const { data: balance, ...tokenQuery } = useBalance({
    address,
    token,
    enabled: isConnected,
  })
  const isClientReady = useIsClientReady()
  return {
    ...tokenQuery,
    data: !isClientReady || !isConnected ? "0.0" : balance?.formatted ?? "0.0",
  }
}
