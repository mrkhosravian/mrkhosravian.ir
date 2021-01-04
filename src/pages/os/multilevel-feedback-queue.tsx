import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { CpuSchedulers } from "../../constants/os_constants"
import MultilevelFeedbackQueue
  from "../../tools/os/algorithms/MultilevelFeedbackQueue"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8
1
2`

export default function MultilevelFeedbackQueuePage() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = new MultilevelFeedbackQueue().run(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.MFQ_FULL} data={data} rows={5}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}