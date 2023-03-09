import { FC } from "react"

import { useClientLoadingState, useEthPrice, usePepeToEthRatio } from "@/hooks"

import { Button } from "@/components/Button"
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
          <PepeRatio />
        </dd>
        <dt>PEPE</dt>
        <dd className="text-right font-bold">
          <PepePriceUsd />
        </dd>
        <dt>My PEPE</dt>
        <dd className="text-right font-bold">
          <TokenBalance address={PEPE_ADDRESS} />
        </dd>
        <dt>pePEPE</dt>
        <dd className="text-right font-bold">
          <VePepe />
        </dd>
        <dt>PEPE locked</dt>
        <dd className="text-right font-bold">
          <PepeLocked />
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

const PepeRatio: FC = () => {
  const { data: pepeRatio, ...pepeRatioQuery } = usePepeToEthRatio()
  const isLoading = useClientLoadingState(pepeRatioQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `${pepeRatio} stETH`}
    </Skeleton>
  )
}

const PepePriceUsd: FC = () => {
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const { data: pepeToEthRatio, ...pepeToEthRatioQuery } = usePepeToEthRatio()
  const isLoading = useClientLoadingState(ethPriceQuery, pepeToEthRatioQuery)
  return (
    <Skeleton isLoading={isLoading}>
      {isLoading ? "Loading..." : `$${ethPrice * pepeToEthRatio}`}
    </Skeleton>
  )
}

const VePepe: FC = () => {
  // TODO: Implementation
  return <Skeleton isLoading={false}>TODO</Skeleton>
}

const PepeLocked: FC = () => {
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
    <Button color="green" onClick={onClaim}>
      Claim
    </Button>
  )
}
