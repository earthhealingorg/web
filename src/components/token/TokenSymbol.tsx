import { FC } from "react"
import { Address, useToken } from "wagmi"

import { useClientLoadingState } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

type TokenSymbolProps = {
  address: Address
}

export const TokenSymbol: FC<TokenSymbolProps> = ({ address }) => {
  const { data: token, ...tokenQuery } = useToken({ address })
  const isLoading = useClientLoadingState(tokenQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "..." : token?.symbol ?? "ERR"}
    </Skeleton>
  )
}
