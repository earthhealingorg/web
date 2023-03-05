import { FC } from "react"

import Chrt from "@/components/Chrt"

export const Chart: FC = () => {
  return (
    <div className="flex h-96 items-center justify-center bg-slate-300">
      <Chrt />
    </div>
  )
}
