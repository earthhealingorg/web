import { FC } from "react"

import { usePrice } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

export const PspPrice: FC = () => {
  const { data: price, isLoading } = usePrice()
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : price}
    </Skeleton>
  )
}
