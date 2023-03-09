import { ButtonHTMLAttributes, FC } from "react"
import { BiLoader } from "react-icons/bi"

import { clsxm } from "@/lib"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: "blue" | "green"
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  color,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={clsxm(
        "relative mt-2 w-full overflow-hidden rounded-lg py-2 text-xl font-bold",
        {
          "cursor-not-allowed bg-slate-400 text-white": disabled,
          "cursor-wait": isLoading,
          "bg-blue-500 text-white": !disabled && color === "blue",
          "bg-lime-300": !disabled && color === "green",
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
