import { parseEther } from "ethers/lib/utils.js"
import {
  useAccount,
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

export function usePepeApproved({ amount }: { amount: string }) {
  const { address } = useAccount()
  const allowance = useContractRead({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
    functionName: "allowance",
    args: [address ?? "0x", PEPE_ADDRESS],
    enabled: !!address,
  })
  return address ? allowance.data?.gt(parseEther(amount)) : false
}

export function usePepeDepositApprove({ amount }: { amount: string }) {
  const value = parseEther(amount)
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
    functionName: "approve",
    args: [PEPE_ADDRESS, value],
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}

export function usePepeDeposit({ amount }: { amount: string }) {
  const value = parseEther(amount)
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address: PEPE_ADDRESS,
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
