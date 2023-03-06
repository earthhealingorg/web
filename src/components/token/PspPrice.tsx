import { FC } from "react"

import { usePrice } from "@/hooks"
import { useClientLoadingState } from "@/hooks/useClientLoadingState"

import { Skeleton } from "@/components/Skeleton"

export const PspPrice: FC = () => {
  const { data: price, ...priceQuery } = usePrice()
  const isLoading = useClientLoadingState(priceQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : price}
    </Skeleton>
  )
}
