import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import SEO from "../../components/seo"
import Gantt from "../../components/os/Gantt"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { ConvertedData } from "../../models/os/ConvertedData"
import { clone, convertData } from "../../helper/os/helpers"
import { CpuSchedulers } from "../../constants/os_constants"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcFCFS(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.FCFS_FULL} data={data} rows={3}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}


function calcFCFS(inputString: string): any {

  const timeWindows: Frame[] = []
  const data: Process[] = []
  let convertedData: ConvertedData = null
  try {
    convertedData = convertData(inputString, false)
  } catch (e) {
    console.log(e)
    return { data, timeWindows }
  }
  const total = convertedData.processes.length
  const waitingQueue = new TinyQueue<Process>(convertedData.processes, (a, b) => {
    if (a.arrivalTime - b.arrivalTime === 0)
      return b.index - a.index
    return a.arrivalTime - b.arrivalTime
  })
  const readyQueue: Process[] = []
  let doneProcesses: number = 0
  let time: number = 0

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
      readyQueue.push(waitingQueue.pop())

    if (readyQueue.length > 0) {
      const process: Process = readyQueue.pop()

      process.start = time
      process.advance(process.serviceTime)

      timeWindows.push(process.stop(time + process.serviceTime))

      data.push(process)
      doneProcesses++

      time += process.serviceTime
    } else {
      time++
    }

  }

  return { data, timeWindows }
}