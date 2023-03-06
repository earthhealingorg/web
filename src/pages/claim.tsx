import { NextPage } from "next"

import { AppProviders, Header, Seo } from "@/components"

const ClaimPage: NextPage = () => {
  return (
    <AppProviders>
      <Seo templateTitle="Claim" />

      <Header enableWallet />

      <main>
        <div className="layout">Claim</div>
      </main>
    </AppProviders>
  )
}

export default ClaimPage
