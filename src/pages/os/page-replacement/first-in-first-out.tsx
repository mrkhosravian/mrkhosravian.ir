import * as React from "react"
import { useState } from "react"
import PageReplacementLayout from "../../../templates/PageReplacementLayout"
import { PageReplacementAlgorithm } from "../../../constants/os_constants"
import FirstInFirstOut
  from "../../../tools/os/algorithms/page-replacement/FirstInFirstOut"


const sample = `2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2
3`

export default function FirstInFirstOutPage() {

  const [inputString, setInputString] = useState("")

  let firstInFirstOut = new FirstInFirstOut()
  const { timeWindows } = firstInFirstOut.run(inputString.length === 0 ? sample : inputString)

  return (
    <PageReplacementLayout title={PageReplacementAlgorithm.FIFO_FULL}
                           setInputString={setInputString}
                           timeWindows={timeWindows}
                           pageFaults={firstInFirstOut.pageFaults}
                           githubUrl={"https://github.com/mrkhosravian/mrkhosravian.ir/blob/master/src/tools/os/algorithms/page-replacement/FirstInFirstOut.ts"}
    />
  )
}