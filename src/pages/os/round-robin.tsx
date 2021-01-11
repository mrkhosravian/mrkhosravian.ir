import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { CpuSchedulers } from "../../constants/os_constants"
import RoundRobin from "../../tools/os/algorithms/RoundRobin"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8
1`

export default function RoundRobinPage() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = new RoundRobin().run(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout githubUrl={"https://github.com/mrkhosravian/mrkhosravian.ir/blob/master/src/tools/os/algorithms/RoundRobin.ts"} title={CpuSchedulers.RR_FULL} data={data} rows={4}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}