import { BigNumber } from "ethers"

export function useDeposit({ amount: _amount }: { amount: BigNumber }) {
  // const prepare = usePrepareContractWrite({
  //   address: "0x",
  //   abi: undefined,
  //   functionName: "deposit",
  // })
  // const write = useContractWrite(prepare.config)
  // const wait = useWaitForTransaction(write.data?.hash)
  // return {
  //   error: prepare.error || write.error || wait.error,
  //   isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
  //   write,
  // }
}

export function useWithdraw({ amount: _amount }: { amount: BigNumber }) {
  // const prepare = usePrepareContractWrite({
  //   address: "0x",
  //   abi: undefined,
  //   functionName: "withdraw",
  // })
  // const write = useContractWrite(prepare.config)
  // const wait = useWaitForTransaction(write.data?.hash)
  // return {
  //   error: prepare.error || write.error || wait.error,
  //   isLoading: prepare.isLoading || write.isLoading || wait.isLoading,
  //   write,
  // }
}
