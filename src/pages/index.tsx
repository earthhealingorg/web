import Link from "next/link"
import * as React from "react"

import { Seo } from "@/components"
import { Header } from "@/components/Header"

export default function HomePage() {
  return (
    <>
      <Seo />

      <Header />

      <main>
        <div className="layout">
          <h1>Home</h1>
          <Link href="/dashboard" className="underline">
            Dashboard
          </Link>
        </div>
      </main>
    </>
  )
}
