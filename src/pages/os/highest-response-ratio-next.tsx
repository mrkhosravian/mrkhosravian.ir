import * as React from "react"
import { useState } from "react"
import OSLayout from "./OSLayout"
import SEO from "../../components/seo"
import Gantt from "./Gantt"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { convertData } from "../../helper/os/helpers"
import { ConvertedData } from "../../models/os/ConvertedData"
import { CpuSchedulers } from "../../constants/os_constants"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcHRRN(inputString.length === 0 ? sample : inputString)
  // console.log(sampleDate)

  return (
    <OSLayout>
      <SEO title={CpuSchedulers.HRRN_FULL} />
      <h2 className="text-2xl">{CpuSchedulers.HRRN_FULL}</h2>
      <textarea name=""
                className="w-full p-3 leading-relaxed whitespace-pre-line"
                onChange={(e) => setInputString(e.target.value)} rows={3}
                placeholder={sample} />
      <Gantt data={data} timeWindows={timeWindows} />
    </OSLayout>
  )
}

function calcHRRN(inputString: string): any {

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
  const waitingQueue = new TinyQueue<Process>(convertedData.processes, (a, b) => a.arrivalTime - b.arrivalTime)
  const readyQueue: Process[] = []
  let doneProcesses: number = 0
  let time: number = 0

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time) {
      readyQueue.push(waitingQueue.pop())
    }

    if (readyQueue.length > 0) {
      readyQueue.sort((a, b) => {
        if (a.getResponseRatio(time) - b.getResponseRatio(time) === 0)
          return a.arrivalTime - b.arrivalTime
        else return a.getResponseRatio(time) - b.getResponseRatio(time)
      })

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