import { FC, MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BiCog, BiDownArrowAlt } from "react-icons/bi"
import { Address } from "wagmi"

import { useUserBalance } from "@/hooks"

import { TokenAmountUsd, TokenBalance, TokenSymbol } from "@/components"

import { PSP_ADDRESS, STETH_ADDRESS } from "@/constants"

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
      outputToken: PSP_ADDRESS,
    },
  })

  const { data: balance } = useUserBalance({
    address: form.watch("inputToken"),
  })

  const onClickMax: MouseEventHandler<HTMLButtonElement> = () => {
    form.setValue("inputAmount", balance)
  }

  const onClickSettings: MouseEventHandler<HTMLButtonElement> = () => {
    // eslint-disable-next-line no-console
    console.log("settings clicked")
  }

  const onClickSwitch: MouseEventHandler<HTMLButtonElement> = () => {
    const newInputToken = form.getValues("outputToken")
    const newOutputToken = form.getValues("inputToken")
    form.setValue("inputToken", newInputToken, {
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

  return (
    <div className="rounded-xl bg-slate-100 p-3">
      <header className="mx-1 mb-2 flex items-center justify-between text-lg">
        <h1 className="font-bold">Swap</h1>
        <button className="" onClick={onClickSettings}>
          <BiCog className="h-5 w-5" />
          <span className="sr-only">Transaction settings</span>
        </button>
      </header>
      <form
        className="relative flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* input token + amount */}
        <div className="relative mb-2 grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-y-1">
          <input
            type="text"
            className="peer relative z-10 col-start-1 row-start-1 bg-transparent px-4 pt-3 pb-1 text-3xl focus:outline-none"
            placeholder="0.0"
            {...form.register("inputAmount", {
              validate: (_value) => undefined,
            })}
          />
          <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
            <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
              <TokenSymbol address={form.watch("inputToken")} />
            </span>
          </div>
          <div className="relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2 text-right">
            <div>
              <TokenAmountUsd
                address={form.watch("inputToken")}
                amount={form.watch("inputAmount")}
              />
            </div>
            <div className="text-sm">
              <span>Balance:</span>{" "}
              <TokenBalance address={form.watch("inputToken")} /> (
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
            className="peer relative z-10 col-start-1 row-start-1 bg-transparent px-4 pt-3 pb-1 text-3xl focus:outline-none"
            placeholder="0.0"
            {...form.register("outputAmount", {
              validate: (_value) => undefined,
            })}
          />
          <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
            <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
              <TokenSymbol address={form.watch("outputToken")} />
            </span>
          </div>
          <div className="relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2 text-right">
            <div>
              <TokenAmountUsd
                address={form.watch("outputToken")}
                amount={form.watch("outputAmount")}
              />
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

        <button
          className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-slate-400 text-slate-100 ring-4 ring-slate-100"
          onClick={onClickSwitch}
        >
          <span className="sr-only">Switch</span>
          <BiDownArrowAlt className="h-6 w-6" />
        </button>
      </form>
    </div>
  )
}
