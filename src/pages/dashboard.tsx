import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NextPage } from "next"
import { WagmiConfig } from "wagmi"

import { chains, wagmiClient } from "@/lib"

import { Chart, Header, Lock, Seo, Swap } from "@/components"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000 * 60,
    },
  },
})

const Dashboard: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default Dashboard
