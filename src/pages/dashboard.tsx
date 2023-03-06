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

const Dashboard: NextPage = () => {
  return (
    <AppProviders>
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
    </AppProviders>
  )
}

export default Dashboard
