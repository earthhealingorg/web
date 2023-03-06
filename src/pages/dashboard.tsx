import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NextPage } from "next"
import { WagmiConfig } from "wagmi"

import { chains, wagmiClient } from "@/lib"

import { Chart, Claim, Header, Lock, Seo, Swap } from "@/components"

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
            <div className="layout grid shrink-0 grid-cols-[3fr,2fr] grid-rows-2 gap-6">
              <div className="col-start-1 row-start-1 shrink-0">
                <Chart />
              </div>
              <div className="col-start-1 row-start-2 shrink-0">
                <Swap />
              </div>
              <div className="col-start-2 row-span-2 row-start-1 shrink-0">
                <div className="space-y-3 rounded-xl bg-slate-100 p-3">
                  <Claim />
                  <Lock />
                </div>
              </div>
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default Dashboard
