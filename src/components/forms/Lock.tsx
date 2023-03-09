import moment from "moment"
import { FC, useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/Button"

type LockFormValues = {
  amount: string
  lockDate: string
  stayMaxLocked: boolean
}

const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm"

export const Lock: FC = () => {
  const presetValues = useMemo(
    () => [
      moment().add("3", "months").format(DATETIME_FORMAT),
      moment().add("6", "months").format(DATETIME_FORMAT),
      moment().add("9", "months").format(DATETIME_FORMAT),
      moment().add("12", "months").format(DATETIME_FORMAT),
    ],
    []
  )

  const form = useForm<LockFormValues>({
    defaultValues: {
      amount: "",
      lockDate: presetValues[0],
      stayMaxLocked: false,
    },
    mode: "all",
    reValidateMode: "onChange",
  })

  const isMaxLocked = form.watch("stayMaxLocked")
  const errorMessageDate = form.formState.errors?.lockDate?.message

  const onCreateLock: SubmitHandler<LockFormValues> = ({
    amount,
    lockDate,
    stayMaxLocked,
  }) => {
    // eslint-disable-next-line no-console
    console.log("onCreateLock", { amount, lockDate, stayMaxLocked })
  }

  const onExtendLock: SubmitHandler<LockFormValues> = ({
    amount,
    lockDate,
    stayMaxLocked,
  }) => {
    // eslint-disable-next-line no-console
    console.log("onExtendLock", { amount, lockDate, stayMaxLocked })
  }

  return (
    <div>
      <h1 className="mx-1 mb-1 text-lg font-bold">Lock PSP</h1>
      <form onSubmit={() => null}>
        <input
          type="datetime-local"
          className="w-full rounded-lg p-2 px-3 text-lg disabled:bg-slate-200 disabled:text-slate-500"
          disabled={isMaxLocked}
          {...form.register("lockDate", {
            validate: (value) => {
              if (moment(value).isBefore(moment())) {
                return "You must choose a date in the future"
              }
            },
          })}
        />
        {!isMaxLocked && errorMessageDate && (
          <div className="mt-1 text-red-500">{errorMessageDate}</div>
        )}

        <div className="mt-2 grid grid-cols-4 divide-x divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white text-xs">
          {presetValues.map((value) => (
            <button
              key={value}
              className="p-2 font-bold disabled:bg-slate-200 disabled:text-slate-500 enabled:data-[active=true]:bg-blue-500 enabled:data-[active=true]:text-white"
              type="button"
              data-active={form.watch("lockDate") === value}
              onClick={() => form.setValue("lockDate", value)}
              disabled={isMaxLocked}
            >
              {moment().to(moment(value), true)}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <input
            id="stayMaxLocked"
            type="checkbox"
            {...form.register("stayMaxLocked")}
          />
          <label htmlFor="stayMaxLocked">Stay max locked</label>
        </div>

        <div className="flex gap-2">
          <Button
            className="mt-3 w-full rounded-lg bg-blue-500 p-2 text-base font-bold text-white"
            color="blue"
            onClick={form.handleSubmit(onCreateLock)}
            type="submit"
          >
            Create lock
          </Button>
          <Button
            className="mt-3 w-full rounded-lg bg-blue-500 p-2 text-base font-bold text-white"
            color="blue"
            onClick={form.handleSubmit(onExtendLock)}
            type="submit"
          >
            Extend lock
          </Button>
        </div>
      </form>
    </div>
  )
}
