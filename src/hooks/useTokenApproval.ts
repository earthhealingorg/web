import { parseEther, parseUnits } from "ethers/lib/utils.js"
import {
  Address,
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

export function useIsTokenApproved({
  address,
  amount,
  spender,
}: {
  address: Address
  amount: string
  spender: Address
}) {
  const { address: userAddress } = useAccount()
  const allowance = useContractRead({
    abi: erc20ABI,
    address,
    functionName: "allowance",
    args: [userAddress ?? "0x", spender],
    enabled: !!userAddress,
  })
  return address
    ? allowance.data?.gt(parseEther(amount || "0")) ?? false
    : false
}

export function useTokenApprove({
  address,
  amount,
  spender,
}: {
  address: Address
  amount: string
  spender: Address
}) {
  const value = parseUnits(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: erc20ABI,
    address,
    functionName: "approve",
    args: [spender, value],
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isError: prepare.error,
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}
