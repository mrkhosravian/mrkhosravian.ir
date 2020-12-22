import * as React from "react"
import { useState } from "react"
import OSLayout from "./OSLayout"
import SEO from "../../components/seo"
import Gantt from "./Gantt"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"
import { clone, convertData } from "../../helper/os/helpers"
import { ConvertedData } from "../../models/os/ConvertedData"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8
1`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcRR(inputString.length === 0 ? sample : inputString)
  // console.log(sampleDate)

  return (
    <OSLayout>
      <SEO title={"Shortest Remaining Time First Algorithm"} />
      <h2 className="text-2xl">Round Robin</h2>
      <textarea name=""
                className="w-full p-3 leading-relaxed whitespace-pre-line"
                onChange={(e) => setInputString(e.target.value)} rows={4}
                placeholder={sample} />
      <Gantt data={data} timeWindows={timeWindows} />
    </OSLayout>
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

  console.log(clone(waitingQueue), clone(convertedData))

  while (doneProcesses < total) {
    while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
      readyQueue.unshift(waitingQueue.pop())

    console.log("TIME", time, "READY QUEUE!!!", clone(readyQueue))

    if (readyQueue.length > 0) {
      const process: Process = readyQueue.pop()
      // console.log(process)

      process.start = time
      process.advance(quantum)

      time++
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