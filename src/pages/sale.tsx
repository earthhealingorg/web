import { NextPage } from "next"

import { AppProviders, Header, Sale, Seo } from "@/components"

const SalePage: NextPage = () => {
  return (
    <AppProviders>
      <Seo templateTitle="Sale" />

      <Header enableWallet />

      <main>
        <div className="layout">
          <div className="mx-auto w-full max-w-md">
            <div>
              <h1 className="text-2xl font-bold">Sale</h1>
              <p>Total deposits will be...</p>
            </div>
            <div className="mt-3">
              <Sale />
            </div>
          </div>
        </div>
      </main>
    </AppProviders>
  )
}

export default SalePage
