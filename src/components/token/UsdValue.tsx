import { FC } from "react"

import { useClientLoadingState, useEthPrice, usePepeToEthRatio } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"

type UsdValueProps = {
  amount: string
}

export const UsdValueEth: FC<UsdValueProps> = ({ amount }) => {
  const numAmount = Number(amount)
  const absAmount = Math.abs(isNaN(numAmount) ? 0 : numAmount)
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const isLoading = useClientLoadingState(ethPriceQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `$${(ethPrice * absAmount).toFixed(2)}`}
    </Skeleton>
  )
}

export const UsdValuePsp: FC<UsdValueProps> = ({ amount }) => {
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const { data: pspToEthRatio, ...pspToEthRatioQuery } = usePepeToEthRatio()
  const isLoading = useClientLoadingState(ethPriceQuery, pspToEthRatioQuery)
  const numAmount = Number(amount)
  const absAmount = Math.abs(isNaN(numAmount) ? 0 : numAmount)
  const ethAmount = absAmount * pspToEthRatio
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `$${(ethPrice * ethAmount).toFixed(2)}`}
    </Skeleton>
  )
}
