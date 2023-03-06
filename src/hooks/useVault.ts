import { parseEther } from "ethers/lib/utils.js"
import {
  Address,
  erc4626ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { vaultAbi } from "@/constants"

export function useVaultTotalAssets({ address }: { address: Address }) {
  return useContractRead({
    abi: vaultAbi,
    address,
    functionName: "totalAssets",
  })
}

export function useVaultPreview({
  address,
  amount,
  isDeposit,
}: {
  address: Address
  amount: string
  isDeposit: boolean
}) {
  const { address: receiver } = useAccount()
  const value = parseEther(amount || "0")
  return useContractRead({
    abi: erc4626ABI,
    address,
    functionName: isDeposit ? "previewDeposit" : "previewWithdraw",
    args: [value],
    enabled: !!receiver && amount !== "" && amount !== "0",
  })
}

export function useVaultDeposit({
  address,
  amount,
  enabled,
}: {
  address: Address
  amount: string
  enabled: boolean
}) {
  const value = parseEther(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address,
    functionName: "deposit",
    args: [value],
    enabled,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isError: prepare.isError,
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}

export function useVaultWithdraw({
  address,
  amount,
  enabled,
}: {
  address: Address
  amount: string
  enabled: boolean
}) {
  const { address: receiver } = useAccount()
  const value = parseEther(amount || "0")
  const prepare = usePrepareContractWrite({
    abi: vaultAbi,
    address,
    functionName: "withdraw",
    args: [value, receiver ?? "0x"],
    enabled: enabled && !!receiver,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isError: prepare.isError,
    isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
    write: write.write,
  }
}
