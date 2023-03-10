import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
import { FC, MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BiDownArrowAlt } from "react-icons/bi"
import { Address } from "wagmi"

import { clsxm } from "@/lib"
import { useUserBalance } from "@/hooks"
import { useIsTokenApproved, useTokenApprove } from "@/hooks/useTokenApproval"
import {
  useVaultDeposit,
  useVaultPreview,
  useVaultWithdraw,
} from "@/hooks/useVault"

import { TokenSymbol, UsdValueEth, UsdValuePsp } from "@/components"
import { Button } from "@/components/Button"
import { TokenInput } from "@/components/forms/TokenInput"

import { STETH_ADDRESS } from "@/constants"

type SwapProps = {
  enableWithdraw?: boolean
  vaultAddress: Address
}

type SwapFormValues = {
  inputAmount: string
  inputToken: Address
}

export const Swap: FC<SwapProps> = ({ enableWithdraw, vaultAddress }) => {
  const form = useForm<SwapFormValues>({
    defaultValues: {
      inputAmount: "",
      inputToken: STETH_ADDRESS,
    },
    mode: "all",
    reValidateMode: "onChange",
  })

  const isDeposit = form.watch("inputToken") === STETH_ADDRESS
  const inputAmount = form.watch("inputAmount")
  const inputTokenAddr = form.watch("inputToken")
  const outputTokenAddr = isDeposit ? vaultAddress : STETH_ADDRESS

  const { data: inputTokenBalance } = useUserBalance({
    address: inputTokenAddr,
    onSuccess: () => form.trigger("inputAmount"),
  })

  const onClickMax: MouseEventHandler<HTMLButtonElement> = () => {
    if (inputTokenBalance?.value.eq(0)) return
    form.setValue("inputAmount", inputTokenBalance?.formatted ?? "0.0", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onClickSwitch: MouseEventHandler<HTMLButtonElement> = () => {
    form.reset({ inputAmount: "", inputToken: outputTokenAddr })
  }

  const preview = useVaultPreview({
    address: vaultAddress,
    amount: inputAmount,
    enabled: form.formState.isValid,
    isDeposit,
  })
  const previewFormatted = formatEther(preview.data ?? BigNumber.from(0))

  const isApproved = useIsTokenApproved({
    address: inputTokenAddr,
    amount: inputAmount,
    spender: vaultAddress,
    enabled: form.formState.isValid,
  })
  const writeApprove = useTokenApprove({
    address: inputTokenAddr,
    amount: inputAmount,
    spender: vaultAddress,
    enabled: form.formState.isValid,
  })
  const writeDeposit = useVaultDeposit({
    address: vaultAddress,
    amount: inputAmount,
    enabled: form.formState.isValid && isDeposit && isApproved,
  })
  const writeWithdraw = useVaultWithdraw({
    address: vaultAddress,
    amount: inputAmount,
    enabled: form.formState.isValid && !isDeposit && isApproved,
  })

  const onSubmit: SubmitHandler<SwapFormValues> = () => {
    if (!isApproved) {
      writeApprove.write?.()
      return
    }
    if (isDeposit) {
      writeDeposit.write?.()
      return
    }
    writeWithdraw.write?.()
  }

  return (
    <>
      <header className="mx-1 mb-2">
        <h1 className="text-lg font-bold">Swap</h1>
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          <TokenInput
            address={inputTokenAddr}
            control={form.control}
            isDeposit={isDeposit}
            name="inputAmount"
            onClickMax={onClickMax}
            revalidateForm={form.trigger}
          />

          {/* output token + amount */}
          <div className="relative grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-y-1">
            <input
              type="text"
              className={clsxm(
                "peer relative z-10 col-start-1 row-start-1 w-full bg-transparent px-4 pt-3 pb-1 text-3xl text-slate-400 focus:outline-none",
                {
                  "animate animate-pulse":
                    preview.isLoading || preview.isFetching,
                }
              )}
              value={previewFormatted}
              disabled
            />
            <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
              <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
                <TokenSymbol address={outputTokenAddr} />
              </span>
            </div>
            <div
              className={clsxm(
                "relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2 text-slate-400",
                {
                  "animate animate-pulse":
                    preview.isLoading || preview.isFetching,
                }
              )}
            >
              {!isDeposit ? (
                <UsdValueEth amount={previewFormatted} />
              ) : (
                <UsdValuePsp amount={previewFormatted} />
              )}
            </div>
            {/* focus styles */}
            <div
              className="relative z-0 col-span-full col-start-1 row-span-full row-start-1 rounded-lg bg-slate-200 content-[''] peer-focus:ring-2 peer-focus:ring-inset peer-focus:ring-blue-500"
              aria-hidden="true"
            >
              &nbsp;
            </div>
          </div>

          {enableWithdraw && (
            <button
              className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-slate-400 text-slate-100 ring-4 ring-slate-100"
              onClick={onClickSwitch}
            >
              <span className="sr-only">Switch</span>
              <BiDownArrowAlt className="h-6 w-6" />
            </button>
          )}
        </div>

        <Button
          color="blue"
          isLoading={
            form.formState.isValid &&
            (writeApprove.isLoading ||
              writeDeposit.isLoading ||
              writeWithdraw.isLoading)
          }
          disabled={!form.formState.isValid}
        >
          {form.formState.isValid
            ? preview.isError
              ? "Error previewing swap"
              : writeApprove.isError ||
                writeDeposit.isError ||
                writeWithdraw.isError
              ? "Error preparing transaction"
              : "Swap"
            : form.formState.errors.inputAmount?.message ?? "Enter an amount"}
        </Button>
      </form>
    </>
  )
}
