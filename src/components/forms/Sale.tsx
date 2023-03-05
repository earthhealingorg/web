import { FC, MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { TokenInput } from "@/components/forms/TokenInput"

import { PRE_PEPE_ADDRESS } from "@/constants"

type SaleFormValues = {
  amount: string
}

export const Sale: FC = () => {
  const form = useForm<SaleFormValues>({
    defaultValues: {
      amount: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  })

  const onClickMax: MouseEventHandler<HTMLButtonElement> = () => {
    //
  }

  const onSubmit: SubmitHandler<SaleFormValues> = () => {
    //
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TokenInput
        address={PRE_PEPE_ADDRESS}
        control={form.control}
        isDeposit
        name="amount"
        onClickMax={onClickMax}
        revalidateForm={form.trigger}
      />
    </form>
  )
}
