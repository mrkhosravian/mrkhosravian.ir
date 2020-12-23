import * as React from "react"
import { useState } from "react"
import OSLayout from "../../templates/OSLayout"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { convertData } from "../../helper/os/helpers"
import { CpuSchedulers } from "../../constants/os_constants"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcSJF(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.SRTF_FULL} data={data} rows={3}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}

function calcSJF(inputString: string): any {

  let convertedData: Process[] = null
  try {
    convertedData = convertData(inputString, false).processes
  } catch (e) {
    console.log(e)
    return { data: [], timeWindows: [] }
  }

  const total = convertedData.length
  const waitingQueue = new TinyQueue<Process>(convertedData, (a, b) => a.arrivalTime - b.arrivalTime)
  const readyQueue = new TinyQueue<Process>([], (a, b) => {
    if (a.remainingTime - b.remainingTime === 0)
      return a.arrivalTime - b.arrivalTime
    else return a.remainingTime - b.remainingTime
  })
  let doneProcesses: number = 0
  let time: number = 0
  let data: Process[] = []
  const timeWindows: Frame[] = []

  let lastProcess: Process = null

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time) {
      readyQueue.push(waitingQueue.pop())
    }
    if (readyQueue.length > 0) {
      const process: Process = readyQueue.peek()

      if (!process.equals(lastProcess)) { // new process comes
        if (lastProcess !== null) { // there was a process before
          const frame = lastProcess.stop(time)
          timeWindows.push(frame)
        }
        process.start = time
      }

      time++
      process.advance(1)

      if (process.isDone()) {
        timeWindows.push(new Frame(process.start, time, process.processName))
        doneProcesses++
        process.stop(time)
        data.push(readyQueue.pop())
        lastProcess = null
      } else {
        lastProcess = process
      }
    } else {
      time++
    }
  }

  return { data, timeWindows }
}