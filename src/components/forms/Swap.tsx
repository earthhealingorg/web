import { BigNumber } from "ethers"
import { parseUnits } from "ethers/lib/utils.js"
import { FC, MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BiDownArrowAlt } from "react-icons/bi"
import { Address, useToken } from "wagmi"

import { usePspToEthRatio, useUserBalance } from "@/hooks"

import {
  TokenBalance,
  TokenSymbol,
  UsdValueEth,
  UsdValuePsp,
} from "@/components"

import { PEPE_ADDRESS, STETH_ADDRESS } from "@/constants"

type SwapFormValues = {
  inputAmount: string
  inputToken: Address
  outputAmount: string
  outputToken: Address
}

export const Swap: FC = () => {
  const form = useForm<SwapFormValues>({
    defaultValues: {
      inputAmount: "",
      inputToken: STETH_ADDRESS,
      outputAmount: "",
      outputToken: PEPE_ADDRESS,
    },
    mode: "all",
    reValidateMode: "onChange",
  })

  const inputTokenAddr = form.watch("inputToken")
  const outputTokenAddr = form.watch("outputToken")

  const { data: pspToEthRatio } = usePspToEthRatio()
  const { data: inputToken } = useToken({ address: inputTokenAddr })
  const { data: inputTokenBalance } = useUserBalance({
    address: inputTokenAddr,
  })

  const onClickMax: MouseEventHandler<HTMLButtonElement> = () => {
    if (inputTokenBalance?.value.eq(0)) return
    form.setValue("inputAmount", inputTokenBalance?.formatted ?? "0.0", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    form.setValue(
      "outputAmount",
      getOutputForInput(inputTokenBalance?.formatted)
    )
  }

  const onClickSwitch: MouseEventHandler<HTMLButtonElement> = () => {
    const newInputAmount = form.getValues("outputAmount")
    const newInputToken = form.getValues("outputToken")
    const newOutputAmount = form.getValues("inputAmount")
    const newOutputToken = form.getValues("inputToken")
    form.setValue("inputAmount", newInputAmount, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    form.setValue("inputToken", newInputToken, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    form.setValue("outputAmount", newOutputAmount, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    form.setValue("outputToken", newOutputToken, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<SwapFormValues> = ({
    inputAmount,
    inputToken,
    outputAmount,
    outputToken,
  }) => {
    // eslint-disable-next-line no-console
    console.log("Swapping", {
      inputAmount,
      inputToken,
      outputAmount,
      outputToken,
    })
  }

  const getOutputForInput = (valueString?: string) => {
    const value = Number(valueString)
    if (isNaN(value)) return "0.0"
    return form.getValues("inputToken") === STETH_ADDRESS
      ? String(value * pspToEthRatio)
      : String(value / pspToEthRatio)
  }

  const getInputForOutput = (valueString?: string) => {
    const value = Number(valueString)
    if (isNaN(value)) return "0.0"
    return form.getValues("inputToken") === STETH_ADDRESS
      ? String(value / pspToEthRatio)
      : String(value * pspToEthRatio)
  }

  return (
    <div className="rounded-xl bg-slate-100 p-3">
      <header className="mx-1 mb-2">
        <h1 className="text-lg font-bold">Swap</h1>
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          {/* input token + amount */}
          <div className="relative mb-2 grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-y-1">
            <input
              type="text"
              className="peer relative z-10 col-start-1 row-start-1 w-full bg-transparent px-4 pt-3 pb-1 text-3xl focus:outline-none"
              placeholder="0.0"
              {...form.register("inputAmount", {
                onChange: (e) => {
                  form.setValue(
                    "outputAmount",
                    getOutputForInput(e.target.value),
                    {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    }
                  )
                },
                validate: (valueString) => {
                  const value = Number(valueString)
                  if (isNaN(value) || valueString === "")
                    return "Enter an amount"
                  const valueSafe = String(
                    value.toFixed(inputToken?.decimals ?? 18)
                  )
                  const valueParsed = parseUnits(
                    valueSafe,
                    inputToken?.decimals ?? 18
                  )
                  if (
                    (inputTokenBalance?.value ?? BigNumber.from(0)).lt(
                      valueParsed
                    )
                  )
                    return "Insufficient balance"
                  if (valueParsed.lte(BigNumber.from(0)))
                    return "Enter an amount"
                  return true
                },
              })}
            />
            <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
              <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
                <TokenSymbol address={inputTokenAddr} />
              </span>
            </div>
            <div className="relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2">
              <div>
                {inputTokenAddr === STETH_ADDRESS ? (
                  <UsdValueEth amount={form.watch("inputAmount")} />
                ) : (
                  <UsdValuePsp amount={form.watch("inputAmount")} />
                )}
              </div>
              <div className="text-sm">
                <span>Balance:</span> <TokenBalance address={inputTokenAddr} />{" "}
                (
                <button className="underline" onClick={onClickMax}>
                  Max
                </button>
                )
              </div>
            </div>
            {/* focus styles */}
            <div
              className="relative z-0 col-span-full col-start-1 row-span-full row-start-1 rounded-lg bg-slate-200 content-[''] peer-focus:ring-2 peer-focus:ring-inset peer-focus:ring-blue-500"
              aria-hidden="true"
            >
              &nbsp;
            </div>
          </div>

          {/* output token + amount */}
          <div className="relative grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-y-1">
            <input
              type="text"
              className="peer relative z-10 col-start-1 row-start-1 w-full bg-transparent px-4 pt-3 pb-1 text-3xl focus:outline-none"
              placeholder="0.0"
              {...form.register("outputAmount", {
                onChange: (e) => {
                  form.setValue(
                    "inputAmount",
                    getInputForOutput(e.target.value),
                    {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    }
                  )
                },
                validate: (valueString) => {
                  const value = Number(valueString)
                  if (isNaN(value)) return "Enter an amount"
                  return true
                },
              })}
            />
            <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
              <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
                <TokenSymbol address={outputTokenAddr} />
              </span>
            </div>
            <div className="relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2">
              {outputTokenAddr === STETH_ADDRESS ? (
                <UsdValueEth amount={form.watch("inputAmount")} />
              ) : (
                <UsdValuePsp amount={form.watch("inputAmount")} />
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

          <button
            className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-slate-400 text-slate-100 ring-4 ring-slate-100"
            onClick={onClickSwitch}
          >
            <span className="sr-only">Switch</span>
            <BiDownArrowAlt className="h-6 w-6" />
          </button>
        </div>

        <button
          className="not-disabled:bg-blue-500 mt-2 w-full rounded-lg py-2 text-xl font-bold text-white disabled:bg-slate-400"
          disabled={!form.formState.isValid}
        >
          {form.formState.isDirty
            ? form.formState.isValid
              ? "Swap"
              : form.formState.errors.inputAmount?.message ?? "Enter an amount"
            : "Enter an amount"}
        </button>
      </form>
    </div>
  )
}
