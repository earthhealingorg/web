import { FC } from "react"
import { Address } from "wagmi"

import {
  useClientLoadingState,
  useIsClientReady,
  useUserBalance,
} from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

type TokenBalanceProps = {
  address: Address
}

export const TokenBalance: FC<TokenBalanceProps> = ({ address }) => {
  const { data: balance, ...tokenQuery } = useUserBalance({
    address,
  })
  const isClientReady = useIsClientReady()
  const isLoading = useClientLoadingState(tokenQuery)

  return (
    <Skeleton isLoading={isLoading}>
      {isClientReady
        ? isLoading
          ? "..."
          : balance?.formatted ?? "ERR"
        : "0.0"}
    </Skeleton>
  )
}
