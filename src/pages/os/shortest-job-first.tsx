import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { CpuSchedulers } from "../../constants/os_constants"
import ShortestJobFirst from "../../tools/os/algorithms/ShortestJobFirst"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestJobFirstPage() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = new ShortestJobFirst().run(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout
      githubUrl={"https://github.com/mrkhosravian/mrkhosravian.ir/blob/master/src/tools/os/algorithms/ShortestJobFirst.ts"}
      title={CpuSchedulers.SJF_FULL} data={data} rows={3}
      sample={sample} setInputString={setInputString}
      timeWindows={timeWindows} />
  )
}