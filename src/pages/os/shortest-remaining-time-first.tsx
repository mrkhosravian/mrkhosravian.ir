import * as React from "react"
import { useState } from "react"
import OSLayout from "./OSLayout"
import SEO from "../../components/seo"
import Gantt from "./Gantt"
import { Frame, Process } from "./types"
import TinyQueue from "tinyqueue"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  const { data, timeWindows } = calcSJF(inputString.length === 0 ? sample : inputString)
  // console.log(sampleDate)

  return (
    <OSLayout>
      <SEO title={"Shortest Remaining Time First Algorithm"} />
      <h2 className="text-2xl">Shortest Remaining Time First Algorithm</h2>
      <textarea name=""
                className="w-full p-3 leading-relaxed whitespace-pre-line"
                onChange={(e) => setInputString(e.target.value)} rows={3}
                placeholder={sample} />
      <Gantt data={data} timeWindows={timeWindows} />
    </OSLayout>
  )
}

function calcSJF(inputString: string): any {

  let convertedData: Process[] = null
  try {
    convertedData = convertData(inputString)
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
    console.log("TIME", time, "READY QUEUE!!!!", clone(readyQueue))
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

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function convertData(data: string): Process[] {
  if (data.length === 0) throw new Error("length is zero")
  const dataRows = data.split("\n")
  if (dataRows.length > 3) throw new Error("too many lines")

  if (isNaN(Number(dataRows[0]))) throw new Error("not a number")
  if (dataRows[0].length === 0) throw new Error("wrong process numbers")
  const process: number = Number(dataRows[0])

  if (dataRows[1].length === 0) throw new Error("serviceTimes length is zero")
  let serviceTimesString: string[] = dataRows[1].split(",")
  if (serviceTimesString.length !== process) throw new Error("wrong serviceTimes")
  let serviceTimes: number[] = serviceTimesString.map(it => Number(it.trim()))
  for (const processTime of serviceTimes) {
    if (isNaN(processTime)) throw new Error("Invalid Number")
  }


  if (dataRows[2].length === 0) throw new Error("arrivalTimes length is zero")
  const arrivalTimesString: string[] = dataRows[2].split(",")
  if (arrivalTimesString.length !== process) throw new Error("wrong arrivalTimes")
  let arrivalTimes: number[] = arrivalTimesString.map(it => Number(it.trim()))
  for (const arrivalTime of arrivalTimes) {
    if (isNaN(arrivalTime)) throw new Error("Invalid Number")
  }


  let out: Process[] = []
  for (let i = 0; i < process; i++) {
    out.push(new Process(String(i + 1), arrivalTimes[i], serviceTimes[i]))
  }
  return out
}