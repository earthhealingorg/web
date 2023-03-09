import { FC } from "react"

import { Button } from "@/components/Button"
import { TokenBalance } from "@/components/token"

import { PRE_PEPE_ADDRESS } from "@/constants"

export const Vest: FC = () => {
  return (
    <div>
      <h1 className="mx-1 mb-1 text-lg font-bold">My prePEPE</h1>
      <div className="mb-2 text-xl">
        <TokenBalance address={PRE_PEPE_ADDRESS} />
      </div>
      <VestButton />
    </div>
  )
}

const VestButton: FC = () => {
  // TODO: Implementation

  const onVest = () => {
    // eslint-disable-next-line no-console
    console.log("onVest")
  }

  return (
    <Button color="green" onClick={onVest}>
      Vest
    </Button>
  )
}
