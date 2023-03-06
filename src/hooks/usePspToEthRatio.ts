import { useFakeQuery } from "@/hooks/useFakeQuery"

export function usePspToEthRatio() {
  const query = useFakeQuery()
  return {
    ...query,
    data: 0.6,
  }
}
