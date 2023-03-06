import { FC } from "react"

import { useTvl } from "@/hooks"
import { useClientLoadingState } from "@/hooks/useClientLoadingState"

import { Skeleton } from "@/components/Skeleton"

export const PspTvl: FC = () => {
  const { data: tvl, ...tvlQuery } = useTvl()
  const isLoading = useClientLoadingState(tvlQuery)
  return (
    <Skeleton isLoading={isLoading}>{isLoading ? "Loading..." : tvl}</Skeleton>
  )
}
