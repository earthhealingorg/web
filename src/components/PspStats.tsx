import { FC } from "react"

import { PspPrice } from "@/components"
import { PspTvl } from "@/components/PspTvl"

export const PspStats: FC = () => {
  return (
    <div className="flex items-center gap-3">
      <Tvl />
      <Price />
    </div>
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
