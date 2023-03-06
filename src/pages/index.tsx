import Link from "next/link"
import * as React from "react"

import { Seo } from "@/components"
import { Header } from "@/components/Header"

export default function HomePage() {
  return (
    <>
      <Seo />

      <Header />

      <main>
        <div className="mx-auto mt-12 max-w-prose p-3">
          <h1 className="mb-3 text-2xl">
            Positive Sum Ponzi: revolutionary financial ecosystem powered by
            Ethereum Blockchain
          </h1>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Combines liquid staking derivatives, logarithmic bonding curves,
              and vesting contracts for fair and equitable rewards.
            </li>
            <li>
              Buy and sell PSP, a dynamic market token (DMT). A higher-risk
              higher-reward token that captures value over time with stETH
              rebases and adoption.
            </li>
            <li>
              Voting escrow contract: lock tokens and earn rewards from trading
              fees on the bonding curve.
            </li>
            <li>
              Join us to take control of your financial future and create a
              positive sum [redacted].
            </li>
          </ul>

          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="mx-auto block w-36 rounded-lg bg-blue-500 px-3 py-2 text-lg text-white"
            >
              Enter
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
