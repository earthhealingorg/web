import { BigNumber } from "ethers"
import { parseEther } from "ethers/lib/utils.js"
import { FC, MouseEventHandler } from "react"
import { Control, useController } from "react-hook-form"
import { Address } from "wagmi"

import { useUserBalance } from "@/hooks"

import {
  TokenBalance,
  TokenSymbol,
  UsdValueEth,
  UsdValuePsp,
} from "@/components/token"

type TokenInputProps = {
  address: Address
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  isDeposit?: boolean
  name: string
  onClickMax: MouseEventHandler<HTMLButtonElement>
  revalidateForm: () => void
}

export const TokenInput: FC<TokenInputProps> = ({
  address,
  control,
  isDeposit,
  name,
  onClickMax,
  revalidateForm,
}) => {
  const { data: balance } = useUserBalance({
    address,
    onSuccess: revalidateForm,
  })

  const controller = useController({
    control,
    name,
    rules: {
      validate: (valueString) => {
        const value = Number(valueString)
        if (isNaN(value) || valueString === "") return "Enter an amount"
        const valueSafe = String(value.toFixed(18))
        const valueParsed = parseEther(valueSafe)
        if ((balance?.value ?? BigNumber.from(0)).lt(valueParsed))
          return "Insufficient balance"
        if (valueParsed.lte(BigNumber.from(0))) return "Enter an amount"
        return true
      },
    },
  })

  return (
    <div className="relative mb-2 grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-y-1">
      <input
        type="text"
        className="peer relative z-10 col-start-1 row-start-1 w-full bg-transparent px-4 pt-3 pb-1 text-3xl placeholder:text-black focus:outline-none"
        placeholder="0.0"
        {...controller.field}
      />
      <div className="relative z-10 col-start-2 row-start-1 flex items-center pr-3">
        <span className="mt-2 rounded-md bg-slate-300 px-3 py-1.5 font-bold">
          <TokenSymbol address={address} />
        </span>
      </div>
      <div className="relative z-10 col-span-full col-start-1 row-start-2 flex items-center justify-between px-4 pb-2">
        <div>
          {isDeposit ? (
            <UsdValueEth amount={controller.field.value} />
          ) : (
            <UsdValuePsp amount={controller.field.value} />
          )}
        </div>
        <div className="text-sm">
          <span>Balance:</span> <TokenBalance address={address} /> (
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
  )
}
