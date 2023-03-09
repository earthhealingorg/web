import { NextPage } from "next"

import {
  AppProviders,
  Chart,
  Claim,
  Header,
  Lock,
  Seo,
  Swap,
} from "@/components"

import { PEPE_ADDRESS } from "@/constants"

const Dashboard: NextPage = () => {
  return (
    <AppProviders>
      <Seo templateTitle="Dashboard" />

      <Header enableStats enableWallet />

      <main>
        <div className="layout grid grid-cols-1 gap-3 md:grid-cols-[1fr,minmax(1fr,20em)] md:grid-rows-2 md:gap-6">
          <div className="md:col-start-1 md:row-start-1">
            <div className="h-72 overflow-hidden rounded-xl bg-slate-100 pt-3 pr-3 pb-3">
              <Chart />
            </div>
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <div className="rounded-xl bg-slate-100 p-3">
              <Swap vaultAddress={PEPE_ADDRESS} enableWithdraw />
            </div>
          </div>
          <div className="md:col-start-2 md:row-span-2 md:row-start-1">
            <div className="space-y-3 rounded-xl bg-slate-100 p-3">
              <Claim />
              <Lock />
            </div>
          </div>
        </div>
      </main>
    </AppProviders>
  )
}

export default Dashboard
