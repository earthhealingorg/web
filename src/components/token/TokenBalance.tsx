import { FC } from "react"
import { Address, useAccount, useBalance } from "wagmi"

import { useClientLoadingState, useIsClientReady } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

type TokenBalanceProps = {
  address: Address
}

export const TokenBalance: FC<TokenBalanceProps> = ({ address: token }) => {
  const { address, isConnected } = useAccount()
  const { data: balance, ...tokenQuery } = useBalance({
    address,
    token,
    enabled: isConnected,
  })
  const isClientReady = useIsClientReady()
  const isLoading = useClientLoadingState(tokenQuery)

  return (
    <Skeleton isLoading={isLoading}>
      {isClientReady && isConnected
        ? isLoading
          ? "..."
          : balance?.formatted ?? "ERR"
        : "0.0"}
    </Skeleton>
  )
}
