import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { CpuSchedulers } from "../../constants/os_constants"
import HighestResponseRatioNext
  from "../../tools/os/algorithms/HighestResponseRatioNext"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function HighestResponseRatioNextPage() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = new HighestResponseRatioNext().run(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.HRRN_FULL} data={data} rows={3}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}