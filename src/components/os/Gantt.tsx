import * as React from "react"
import { Process } from "../../models/os/types"

export default function Gantt({ data, timeWindows }: { data: Process[], timeWindows: any }) {

  const totalTurnaroundTime = data
    .reduce((acc, process) => acc + process.getTurnaroundTime(), 0)

  const avgTurnaroundTime = totalTurnaroundTime / data.length

  const totalWaitingTime = data
    .reduce((acc, process) => acc + process.getWaitingTime(), 0)

  const avgWaitingTime = totalWaitingTime / data.length

  return (
    <div className="">
      <p className="mt-10">{timeWindows.map(it => it.toString()).join(", ")}</p>

      <div className="flex items-start my-10 flex-col md:flex-row">

        <div className="overflow-x-auto flex-1 max-w-full md:mr-5">
          <div
            className="grid grid-cols-1 gap-2 text-center col-span-3 min-w-max">
            <div
              className="grid grid-cols-6 rounded-lg bg-gray-600 py-3 px-5 text-white">
              <span>Process</span>
              <span>Arrival Time</span>
              <span>Service Time</span>
              <span>Turnaround Time</span>
              <span>Response Time</span>
              <span>Waiting Time</span>
            </div>

            {
              data
                .sort((a, b) => a.index - b.index)
                .map((process, i) => {
                  return (
                    <div key={i + 1}
                         className={`grid grid-cols-6 py-2 px-5  ${i % 2 === 1 && "rounded-lg bg-gray-300"}`}>
                      <span>{process.processName}</span>
                      <span>{process.arrivalTime}</span>
                      <span>{process.serviceTime}</span>
                      <span>{process.getTurnaroundTime()}</span>
                      <span>{process.getResponseTime()}</span>
                      <span>{process.getWaitingTime()}</span>
                    </div>
                  )
                })
            }

          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 w-full mt-5 md:m-0 md:w-1/5">
          <AvgCard title={"Average Turnaround Time"}
                   value={avgTurnaroundTime} />
          <AvgCard title={"Average Waiting Time"} value={avgWaitingTime} />
        </div>

      </div>

    </div>
  )
}

function AvgCard({ title, value }) {
  return (
    <div
      className="bg-gray-200 rounded-lg grid grid-cols-1 items-center content-center text-center text-xl h-32">
      <span>{title}</span>
      <span className="text-4xl bold">{value}</span>
    </div>
  )
}