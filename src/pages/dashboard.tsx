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
        <div className="layout grid grid-cols-1 gap-6 md:grid-cols-[1fr,20rem] md:grid-rows-2">
          <div className="md:col-start-1 md:row-start-1">
            <Chart />
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <Swap />
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
