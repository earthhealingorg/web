import { FC } from "react"

import { useClientLoadingState, useEthPrice, usePspToEthRatio } from "@/hooks"

import { Skeleton } from "@/components/Skeleton"
import { TokenBalance } from "@/components/token"

import { PEPE_ADDRESS } from "@/constants"

export const Claim: FC = () => {
  return (
    <div>
      <h1 className="mx-1 mb-1 text-lg font-bold">PEPE</h1>
      <dl className="mx-1 mb-3 grid grid-cols-[auto,1fr] gap-x-3">
        <dt>PEPE</dt>
        <dd className="text-right font-bold">
          <PspRatio />
        </dd>
        <dt>PEPE</dt>
        <dd className="text-right font-bold">
          <PspPriceUsd />
        </dd>
        <dt>My PEPE</dt>
        <dd className="text-right font-bold">
          <TokenBalance address={PEPE_ADDRESS} />
        </dd>
        <dt>pePEPE</dt>
        <dd className="text-right font-bold">
          <VePsp />
        </dd>
        <dt>PEPE locked</dt>
        <dd className="text-right font-bold">
          <PspLocked />
        </dd>
        <dt>Time remaining</dt>
        <dd className="text-right font-bold">
          <TimeRemaining />
        </dd>
        <dt>Rewards</dt>
        <dd className="text-right font-bold">
          <Rewards />
        </dd>
      </dl>
      <ClaimButton />
    </div>
  )
}

const PspRatio: FC = () => {
  const { data: pspRatio, ...pspRatioQuery } = usePspToEthRatio()
  const isLoading = useClientLoadingState(pspRatioQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `${pspRatio} stETH`}
    </Skeleton>
  )
}

const PspPriceUsd: FC = () => {
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const { data: pspToEthRatio, ...pspToEthRatioQuery } = usePspToEthRatio()
  const isLoading = useClientLoadingState(ethPriceQuery, pspToEthRatioQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `$${ethPrice * pspToEthRatio}`}
    </Skeleton>
  )
}

const VePsp: FC = () => {
  // TODO: Implementation
  return <Skeleton isLoading={false}>TODO</Skeleton>
}

const PspLocked: FC = () => {
  // TODO: Implementation
  return <Skeleton isLoading={false}>TODO</Skeleton>
}

const TimeRemaining: FC = () => {
  // TODO: Implementation
  return <Skeleton isLoading={false}>TODO</Skeleton>
}

const Rewards: FC = () => {
  // TODO: Implementation
  return <Skeleton isLoading={false}>TODO</Skeleton>
}

const ClaimButton: FC = () => {
  // TODO: Implementation

  const onClaim = () => {
    // eslint-disable-next-line no-console
    console.log("onClaim")
  }

  return (
    <button
      className="w-full rounded-lg bg-lime-300 p-2 font-bold"
      onClick={onClaim}
    >
      Claim
    </button>
  )
}
