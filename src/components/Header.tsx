import { ConnectButton } from "@rainbow-me/rainbowkit"
import { formatEther } from "ethers/lib/utils.js"
import Link from "next/link"
import { FC } from "react"

import {
  useClientLoadingState,
  usePepeToEthRatio,
  useVaultTotalAssets,
} from "@/hooks"

import { Skeleton } from "@/components"

import { PEPE_ADDRESS } from "@/constants"

type HeaderProps = { enableStats?: boolean; enableWallet?: boolean }

export const Header: FC<HeaderProps> = ({ enableStats, enableWallet }) => {
  return (
    <header className="layout mt-6 mb-9 max-md:text-center md:flex md:items-center md:justify-between">
      <div className="inline-flex gap-9 max-md:mx-auto md:flex">
        <h1 className="text-xl leading-none">
          <Link href="/">
            Positive Sum <span className="line-through">Ponzi</span>
            <span className="-mr-1 block text-right">Pepes</span>
          </Link>
        </h1>
        {enableStats && (
          <div className="flex items-center gap-4 max-md:hidden">
            <Tvl />
            <Ratio />
          </div>
        )}
      </div>
      {enableWallet && (
        <div className="max-md:mt-6 max-md:flex max-md:justify-center">
          <ConnectButton showBalance={false} />
        </div>
      )}
    </header>
  )
}

const Tvl: FC = () => {
  const { data: tvl, ...tvlQuery } = useVaultTotalAssets({
    address: PEPE_ADDRESS,
  })
  const isLoading = useClientLoadingState(tvlQuery)
  return (
    <dl className="flex items-baseline gap-1.5 rounded-lg bg-lime-300 px-4 py-1.5">
      <dt className="text-sm">TVL</dt>
      <dd className="text-lg font-bold">
        <Skeleton isLoading={isLoading}>
          {isLoading ? "Loading..." : formatEther(tvl ?? 0)}
        </Skeleton>
      </dd>
    </dl>
  )
}

const Ratio: FC = () => {
  const { data: pspToEthRatio, ...pspToEthRatioQuery } = usePepeToEthRatio()
  const isLoading = useClientLoadingState(pspToEthRatioQuery)
  return (
    <dl className="flex items-baseline gap-1.5 rounded-lg bg-lime-300 px-4 py-1.5">
      <dt className="text-sm">PSP</dt>
      <dd className="text-lg font-bold">
        <Skeleton isLoading={isLoading}>
          {isLoading ? "Loading..." : `${pspToEthRatio} stETH`}
        </Skeleton>
      </dd>
    </dl>
  )
}
