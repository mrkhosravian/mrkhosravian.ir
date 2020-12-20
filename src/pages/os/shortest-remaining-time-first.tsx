import * as React from "react"
import { useEffect, useState } from "react"
import OSLayout from "./OSLayout"
import SEO from "../../components/seo"
import Gantt from "./Gantt"
import { Process } from "./types"

// const sampleDate: Process[] = [
//   { processName: '1', arrivalTime: 1, responseTime: 1, serviceTime: 1, turnaroundTime: 1, waitingTime: 1 },
//   { processName: '1', arrivalTime: 1, responseTime: 1, serviceTime: 1, turnaroundTime: 1, waitingTime: 1 },
//   { processName: '1', arrivalTime: 1, responseTime: 1, serviceTime: 1, turnaroundTime: 1, waitingTime: 1 }
// ]

export default function ShortestRemainingTimeFirst() {

  const [data, setDate] = useState("")

  let sampleDate: Process[] = []
  calcSJF(data).then(console.log)
  console.log(sampleDate)

  return (
    <OSLayout>
      <SEO title={"First ..."} />
      <h2 className="text-2xl">Shortest Remaining Time First Algorithm</h2>
      <textarea name=""
                className="w-full p-3 leading-relaxed whitespace-pre-line"
                onChange={(e) => setDate(e.target.value)} rows={3}
                placeholder={`7
        10, 20, 30, 40, 50, 60, 70
        1, 2, 3, 4, 5, 6, 7`} />
      <Gantt data={sampleDate} />
    </OSLayout>
  )
}

async function calcSJF(data: string) {

  const dd = await convertData(data).catch(e => console.log(e))

  const out = []
  for (let i = 0; i < dd.process; i++) {
    out.push({
      processName: String(i + 1),
      arrivalTime: dd.arrivalTimes[i],
      serviceTime: dd.processTimes[i]
    })
  }
  return out
}

async function convertData(data: string) {
  // const promise = new Promise()
  if (data.length === 0 ) throw new Error("length is zero")
  const dataRows = data.split("\n")
  const process: number = parseInt(dataRows[0])
  const processTimes: number[] = dataRows[1].split(",").map(it => parseInt(it.trim()))
  const arrivalTimes: number[] = dataRows[2].split(",").map(it => parseInt(it.trim()))
  return {
    process, processTimes, arrivalTimes
  }
}