import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { FC } from "react"

import { PspPrice, PspTvl } from "@/components"

type HeaderProps = { enableStats?: boolean; enableWallet?: boolean }

export const Header: FC<HeaderProps> = ({ enableStats, enableWallet }) => {
  return (
    <header className="layout mt-6 mb-9 flex items-center justify-between">
      <div className="flex gap-9">
        <h1 className="text-xl leading-none">
          <Link href="/">
            Positive Sum <span className="line-through">Ponzi</span>
            <span className="-mr-1 block text-right">Pepes</span>
          </Link>
        </h1>
        {enableStats && (
          <div className="flex items-center gap-4">
            <Tvl />
            <Price />
          </div>
        )}
      </div>
      {enableWallet && <ConnectButton />}
    </header>
  )
}

const Tvl: FC = () => {
  return (
    <dl className="flex items-baseline gap-1.5 rounded-lg bg-lime-300 px-4 py-1.5">
      <dt className="text-sm">TVL</dt>
      <dd className="text-lg font-bold">
        <PspTvl />
      </dd>
    </dl>
  )
}

const Price: FC = () => {
  return (
    <dl className="flex items-baseline gap-1.5 rounded-lg bg-lime-300 px-4 py-1.5">
      <dt className="text-sm">PSP</dt>
      <dd className="text-lg font-bold">
        <PspPrice />
      </dd>
    </dl>
  )
}
