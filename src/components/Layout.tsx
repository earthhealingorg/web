import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FC, PropsWithChildren } from "react"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="layout mt-3 mb-6 flex items-center justify-between">
        <h1 className="text-xl">Positive Sum Pepes</h1>
        <ConnectButton />
      </header>

      {children}
    </>
  )
}
