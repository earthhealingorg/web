import { useFakeQuery } from "@/hooks/useFakeQuery"

export function usePepeToEthRatio() {
  const query = useFakeQuery()
  return { ...query, data: 0.6 }
}
