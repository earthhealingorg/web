import { FC } from "react"

import { useTvl } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

export const PspTvl: FC = () => {
  const { data: tvl, isLoading } = useTvl()
  return (
    <Skeleton isLoading={isLoading}>{isLoading ? "Loading..." : tvl}</Skeleton>
  )
}
