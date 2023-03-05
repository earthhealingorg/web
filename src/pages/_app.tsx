import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { AppProps } from "next/app"
import { Comic_Neue } from "next/font/google"
import { WagmiConfig } from "wagmi"

import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import { chains, wagmiClient } from "@/lib"

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className={`${comicNeue.variable} font-primary`}>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
