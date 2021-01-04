import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { CpuSchedulers } from "../../constants/os_constants"
import ShortestRemainingTimeFirst
  from "../../tools/os/algorithms/ShortestRemainingTimeFirst"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirstPage() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = new ShortestRemainingTimeFirst().run(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.SRTF_FULL} data={data} rows={3}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}