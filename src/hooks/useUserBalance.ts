import { Address, useAccount, useBalance } from "wagmi"

export function useUserBalance({
  address: token,
  onSuccess,
}: {
  address: Address
  onSuccess?: () => void
}) {
  const { address, isConnected } = useAccount()
  return useBalance({ address, token, enabled: isConnected, onSuccess })
}
