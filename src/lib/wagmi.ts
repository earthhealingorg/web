import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, mainnet } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY ?? "" }), publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: "Positive Sum Pepes",
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { chains, wagmiClient }
