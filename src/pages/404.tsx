import * as React from "react"

import { Seo } from "@/components"
import { Header } from "@/components/Header"

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle="Not Found" />

      <Header />

      <main>404</main>
    </>
  )
}
