import { NextPage } from "next"

import { AppProviders, Header, Seo } from "@/components"

const SalePage: NextPage = () => {
  return (
    <AppProviders>
      <Seo templateTitle="Sale" />

      <Header enableWallet />

      <main>
        <div className="layout">Sale</div>
      </main>
    </AppProviders>
  )
}

export default SalePage
