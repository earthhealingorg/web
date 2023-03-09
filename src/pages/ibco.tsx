import { NextPage } from "next"

import { AppProviders, Header, Seo, Swap, Vest } from "@/components"

import { PRE_PEPE_ADDRESS } from "@/constants"

const IBCOPage: NextPage = () => {
  return (
    <AppProviders>
      <Seo templateTitle="IBCO" />

      <Header enableStats enableWallet />

      <main>
        <div className="layout grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6">
          <div className="rounded-xl bg-slate-100 p-4 md:col-span-4">
            The Initial Bonding Curve Offering (IBCO) ensures that all
            participants start off on equal footing.
          </div>
          <div className="rounded-xl bg-slate-100 p-4 md:col-span-4">
            After the IBCO has concluded, a proportional amount of PEPE can be
            exchanged for prePEPE.
          </div>
          <div className="rounded-xl bg-slate-100 p-4 md:col-span-4">
            PEPE from prePEPE will be Pepe escrowed for 1 month in pePEPE tokens
            upon claiming them.
          </div>
          <div className="flex flex-col items-center gap-3 md:col-span-10 md:col-start-2 md:flex-row md:gap-6">
            <div className="rounded-xl bg-slate-100 p-3">
              <Swap vaultAddress={PRE_PEPE_ADDRESS} />
            </div>
            <div className="w-full rounded-xl bg-slate-100 p-4 md:w-1/3">
              <Vest />
            </div>
          </div>
        </div>
      </main>
    </AppProviders>
  )
}

export default IBCOPage
