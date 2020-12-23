import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import SEO from "../../components/seo"
import Gantt from "../../components/os/Gantt"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { clone, convertData } from "../../helper/os/helpers"
import { ConvertedData } from "../../models/os/ConvertedData"
import { CpuSchedulers } from "../../constants/os_constants"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8
1`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcRR(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.RR_FULL} data={data} rows={4}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}

function calcRR(inputString: string): any {

  let convertedData: ConvertedData = null
  try {
    convertedData = convertData(inputString, true, 1)
  } catch (e) {
    console.log(e)
    return { data: [], timeWindows: [] }
  }

  const total = convertedData.processes.length
  const quantum = convertedData.quantumList[0]
  const waitingQueue = new TinyQueue<Process>(convertedData.processes, (a, b) => a.arrivalTime - b.arrivalTime)
  const readyQueue: Process[] = []
  const timeWindows: Frame[] = []
  const data: Process[] = []
  let doneProcesses: number = 0
  let time: number = 0

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
      readyQueue.unshift(waitingQueue.pop())

    if (readyQueue.length > 0) {
      const process: Process = readyQueue.pop()

      process.start = time
      process.advance(quantum)

      time += quantum
      timeWindows.push(process.stop(time))

      while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
        readyQueue.unshift(waitingQueue.pop())

      if (process.isDone()) {
        data.push(process)
        doneProcesses++
      } else {
        readyQueue.unshift(process)
      }

    } else {
      time++
    }
  }

  return { data, timeWindows }
}