import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { ConvertedData } from "../../models/os/ConvertedData"
import { convertData } from "../../helper/os/helpers"
import { CpuSchedulers } from "../../constants/os_constants"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcSJF(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.SJF_FULL} data={data} rows={3}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}


function calcSJF(inputString: string): any {

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

  const readyQueue: TinyQueue<Process> = new TinyQueue<Process>([], (a, b) => {
    if (a.serviceTime - b.serviceTime === 0)
      return a.index - b.index
    return a.serviceTime - b.serviceTime
  })

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