import * as React from "react"

import { Layout, Seo } from "@/components"

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <main>404</main>
    </Layout>
  )
}
