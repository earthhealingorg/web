import { parseEther } from "ethers/lib/utils.js"
import {
  useAccount,
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

export function usePrePepeApproved({ amount }: { amount: string }) {
  const { address } = useAccount()
  const allowance = useContractRead({
    abi: presaleVaultAbi,
    address: PRE_PEPE_ADDRESS,
    functionName: "allowance",
    args: [address ?? "0x", PRE_PEPE_ADDRESS],
    enabled: !!address,
  })
  return address ? allowance.data?.gt(parseEther(amount)) : false
}

export function usePrePepeDepositApprove({ amount }: { amount: string }) {
  const value = parseEther(amount)
  const prepare = usePrepareContractWrite({
    abi: presaleVaultAbi,
    address: PRE_PEPE_ADDRESS,
    functionName: "approve",
    args: [PRE_PEPE_ADDRESS, value],
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}

export function usePrePepeDeposit({ amount }: { amount: string }) {
  const value = parseEther(amount)
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
