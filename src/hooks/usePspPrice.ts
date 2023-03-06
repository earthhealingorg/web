import { useFakeQuery } from "@/hooks/useFakeQuery"

export const usePspPrice = () => {
  const query = useFakeQuery()
  return {
    ...query,
    data: "0.012 stETH",
  }
}
