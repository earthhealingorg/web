import { useFakeQuery } from "@/hooks/useFakeQuery"

export const useTvl = () => {
  const query = useFakeQuery()
  return {
    ...query,
    data: "420 stETH",
  }
}
