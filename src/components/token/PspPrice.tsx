import { FC } from "react"

import { usePspPrice } from "@/hooks"
import { useClientLoadingState } from "@/hooks/useClientLoadingState"

import { Skeleton } from "@/components/Skeleton"

export const PspPrice: FC = () => {
  const { data: price, ...priceQuery } = usePspPrice()
  const isLoading = useClientLoadingState(priceQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : price}
    </Skeleton>
  )
}
