import { parseEther } from "ethers/lib/utils.js"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { PEPE_ADDRESS, vaultAbi } from "@/constants"

export function usePepeTotalAssets() {
  return useContractRead({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
    functionName: "totalAssets",
  })
}

export function usePepeDeposit({
  amount,
  enabled,
}: {
  amount: string
  enabled: boolean
}) {
  const value = parseEther(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
    functionName: "deposit",
    args: [value],
    enabled,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}

export function usePepeWithdraw({
  amount,
  enabled,
}: {
  amount: string
  enabled: boolean
}) {
  const value = parseEther(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
    functionName: "deposit",
    args: [value],
    enabled,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}
