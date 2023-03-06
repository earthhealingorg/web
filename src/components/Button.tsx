import { ButtonHTMLAttributes, FC } from "react"
import { BiLoader } from "react-icons/bi"

import { clsxm } from "@/lib"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={clsxm(
        "relative mt-2 w-full overflow-hidden rounded-lg bg-blue-500 py-2 text-xl font-bold text-white",
        {
          "cursor-not-allowed bg-slate-400": disabled,
          "cursor-wait": isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/50">
          <BiLoader className="animate animate-spin" />
        </span>
      )}
    </button>
  )
}
