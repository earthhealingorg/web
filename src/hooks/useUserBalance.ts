import { Address, useAccount, useBalance } from "wagmi"

type UseUserBalanceArgs = {
  address: Address
}

export function useUserBalance({ address: token }: UseUserBalanceArgs) {
  const { address, isConnected } = useAccount()
  return useBalance({
    address,
    token,
    enabled: isConnected,
  })
}
