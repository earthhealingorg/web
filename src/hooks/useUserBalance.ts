import { Address, useAccount, useBalance } from "wagmi"

export function useUserBalance({ address: token }: { address: Address }) {
  const { address, isConnected } = useAccount()
  return useBalance({ address, token, enabled: isConnected })
}
