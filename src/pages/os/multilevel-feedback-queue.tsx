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
0, 2, 4, 6, 8
1
2`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcMFQ(inputString.length === 0 ? sample : inputString)

  return (
    <OSLayout title={CpuSchedulers.MFQ_FULL} data={data} rows={5}
              sample={sample} setInputString={setInputString}
              timeWindows={timeWindows} />
  )
}


function calcMFQ(inputString: string): any {

  const timeWindows: Frame[] = []
  const data: Process[] = []
  let convertedData: ConvertedData = null
  try {
    convertedData = convertData(inputString, true, 2)
  } catch (e) {
    console.log(e)
    return { data, timeWindows }
  }
  const total = convertedData.processes.length
  const quantum1 = convertedData.quantumList[0]
  const quantum2 = convertedData.quantumList[1]
  const waitingQueue = new TinyQueue<Process>(convertedData.processes, (a, b) => {
    if (a.arrivalTime - b.arrivalTime === 0)
      return b.index - a.index
    return a.arrivalTime - b.arrivalTime
  })

  const readyQueue1: Process[] = []
  const readyQueue2: Process[] = []
  const readyQueue3: TinyQueue<Process> = new TinyQueue<Process>([], (a, b) => {
    if (a.arrivalTime - b.arrivalTime === 0)
      return a.index - b.index
    return a.arrivalTime - b.arrivalTime
  })

  let doneProcesses: number = 0
  let time: number = 0

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
      readyQueue1.push(waitingQueue.pop())


    //  Round Robin 1
    if (readyQueue1.length > 0) {
      const process: Process = readyQueue1.pop()

      process.start = time

      time += Math.min(quantum1, process.remainingTime)
      process.advance(quantum1)
      timeWindows.push(process.stop(time))

      while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
        readyQueue1.unshift(waitingQueue.pop())

      if (process.isDone()) {
        data.push(process)
        doneProcesses++
      } else {
        readyQueue2.unshift(process)
      }

    } else if (readyQueue2.length > 0) {
      // Round Robin 2
      const process: Process = readyQueue2.pop()

      process.start = time

      time += Math.min(quantum2, process.remainingTime)
      process.advance(quantum2)

      timeWindows.push(process.stop(time))

      if (process.isDone()) {
        data.push(process)
        doneProcesses++
      } else {
        readyQueue3.push(process)
      }
    } else if (readyQueue3.length > 0) {
      // FCFS
      const process: Process = readyQueue3.pop()

      process.start = time

      time += process.remainingTime
      timeWindows.push(process.stop(time))

      process.advance(process.remainingTime)

      data.push(process)
      doneProcesses++

    } else {
      time++
    }


  }

  return { data, timeWindows }
}