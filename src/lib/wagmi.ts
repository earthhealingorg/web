import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, mainnet } from "wagmi"
import { Chain } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

export const mainnetFixed = {
  ...mainnet,
  rpcUrls: {
    ...mainnet.rpcUrls,
    public: { http: ["https://eth.llamarpc.com"] },
    default: { http: ["https://eth.llamarpc.com"] },
  },
} as const satisfies Chain

const { chains, provider } = configureChains([mainnetFixed], [publicProvider()])
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
