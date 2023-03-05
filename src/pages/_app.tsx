import { AppProps } from "next/app"
import { Comic_Neue } from "next/font/google"

import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${comicNeue.variable} font-primary`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
