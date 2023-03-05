import * as React from "react"

import { Layout, Seo } from "@/components"

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <div className="layout">Home</div>
      </main>
    </Layout>
  )
}
