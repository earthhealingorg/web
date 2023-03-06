import { FC } from "react"
import { Address } from "wagmi"

import { useFakeQuery } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

type TokenAmountUsdProps = {
  address: Address
  amount: string
}

// TODO: Fetch price from coingecko?
export const TokenAmountUsd: FC<TokenAmountUsdProps> = ({
  address: _address,
  amount: _amount,
}) => {
  const { isLoading } = useFakeQuery()
  return (
    <Skeleton isLoading={isLoading}>
      ${Number(1213.23).toLocaleString()}
    </Skeleton>
  )
}
