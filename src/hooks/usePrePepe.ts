import { parseEther } from "ethers/lib/utils.js"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { PRE_PEPE_ADDRESS, presaleVaultAbi } from "@/constants"

export function usePrePepeActive() {
  return useContractRead({
    abi: presaleVaultAbi,
    address: PRE_PEPE_ADDRESS,
    functionName: "active",
  })
}

export function usePrePepeDeposit({ amount }: { amount: string }) {
  const value = parseEther(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: presaleVaultAbi,
    address: PRE_PEPE_ADDRESS,
    functionName: "deposit",
    args: [value],
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}
