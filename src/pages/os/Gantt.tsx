import * as React from "react"
import { Process } from "./types"

export default function Gantt({ data, timeWindows }: { data: Process[], timeWindows: any }) {

  return (
    <div>
      <p className="mt-10">{timeWindows.map(it => it.toString()).join(", ")}</p>
      <div className="grid grid-cols-1 gap-2 my-10">
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
            .sort((a, b) => a.arrivalTime - b.arrivalTime)
            .map((process, i) => {
            return (
              <div key={i + 1}
                   className={`grid grid-cols-6 py-2 px-3  ${i % 2 === 1 && "rounded-lg bg-gray-300"}`}>
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
  )
}