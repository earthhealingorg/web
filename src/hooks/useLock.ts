import { BigNumber } from "ethers"

export function useCreateLock({
  amount: _amount,
  lockDate: _lockDate,
}: {
  amount: BigNumber
  lockDate: string
}) {
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

export function useExtendLock({
  amount: _amount,
  lockDate: _lockDate,
}: {
  amount: BigNumber
  lockDate: string
}) {
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
