import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

type SkeletonProps = {
  isLoading: boolean
}

export const Skeleton: FC<PropsWithChildren<SkeletonProps>> = ({
  children,
  isLoading,
}) => {
  return (
    <span
      className={clsx({
        "animate-pulse bg-black/20 text-transparent": isLoading,
      })}
    >
      {children}
    </span>
  )
}
