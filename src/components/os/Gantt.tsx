import * as React from "react"
import { Frame, Process } from "../../models/os/types"

export default function Gantt({ data, timeWindows }: { data: Process[], timeWindows: any }) {

  const totalTurnaroundTime = data
    .reduce((acc, process) => acc + process.getTurnaroundTime(), 0)

  const avgTurnaroundTime = totalTurnaroundTime / data.length

  const totalWaitingTime = data
    .reduce((acc, process) => acc + process.getWaitingTime(), 0)

  const avgWaitingTime = totalWaitingTime / data.length

  return (
    <div className="">

      <Chart frames={timeWindows} />

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

      <p className="mt-10">Gantt list: {timeWindows.map(it => it.toString()).join(", ")}</p>

    </div>
  )
}

const ProcessColors = ["", "bg-red-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-blue-500","bg-pink-500", "bg-gray-500", "bg-indigo-500"]

function Chart({ frames }: { frames: Frame[] }) {
  if (frames.length === 0) return null
  const totalTime = frames[frames.length - 1].end
  return (
    <div className="overflow-x-auto">
      <div className="h-12 flex mt-16 mb-10 relative" style={{width: `${totalTime < 100 ? "100" : "400"}%`}}>
      <span className="absolute bottom-full left-0 text-black"
            style={{ transform: "translate(0, -10px)" }}>0</span>
        {frames.map((frame, i) => {
          return <>
            {(i > 0 && i < frames.length && frame.start !== frames[i-1].end) && <div style={{width: `${(frame.start - frames[i-1].end) / totalTime * 100}%`}}/>}
            <div
              className={`h-full flex justify-center items-center text-white relative ${ProcessColors[parseInt(frame.name)]} ${i === 0 && "rounded-l-lg"} ${i === frames.length - 1 && "rounded-r-lg"}`}
              style={{ width: `${(frame.end - frame.start) / totalTime * 100}%` }}>
              {frame.name}
              <span className="absolute bottom-full right-0 text-black"
                    style={{ transform: `translate(${totalTime < 100 ? "0" : "-6px"}, -10px)` }}>{frame.end}</span>
            </div>
          </>
        })}
      </div>
    </div>
  )
}

function AvgCard({ title, value }) {
  return (
    <div
      className="bg-gray-200 rounded-lg grid grid-cols-1 items-center content-center text-center text-xl h-32">
      <span>{title}</span>
      <span className="text-4xl bold">{value.toFixed(2)}</span>
    </div>
  )
}