import { useEthPrice } from "@/hooks/useEthPrice"
import { usePspToEthRatio } from "@/hooks/usePspToEthRatio"

export const usePspPrice = () => {
  const { data: ethPrice, ...ethPriceQuery } = useEthPrice()
  const { data: pspToEthRatio, ...pspToEthRatioQuery } = usePspToEthRatio()
  return {
    data: ethPrice * pspToEthRatio,
    isLoading: ethPriceQuery.isLoading || pspToEthRatioQuery.isLoading,
  }
}
