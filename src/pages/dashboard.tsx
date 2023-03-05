import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { NextPage } from "next"
import { WagmiConfig } from "wagmi"

import { chains, wagmiClient } from "@/lib"

import { Chart, Header, Lock, Seo, Swap } from "@/components"

const Dashboard: NextPage = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Seo templateTitle="Dashboard" />

        <Header enableStats enableWallet />

        <main>
          <div className="layout grid grid-cols-[2fr,3fr] grid-rows-2 gap-9">
            <div className="col-start-1 row-start-1">
              <Chart />
            </div>
            <div className="col-start-1 row-start-2">
              <Swap />
            </div>
            <div className="col-start-2 row-span-2 row-start-1">
              <Lock />
            </div>
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Dashboard
