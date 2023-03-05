import { useContractRead } from "wagmi"

import { vaultAbi } from "@/constants"

export function useGetCurveShape({ amount }: { amount: string }) {
  return useContractRead({
    abi: vaultAbi,
    args: [amount],
    functionName: "LSD", //change to function to get price at a steth tvl
  })
}
