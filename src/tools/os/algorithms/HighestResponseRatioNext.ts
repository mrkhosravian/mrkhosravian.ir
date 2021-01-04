import CpuScheduler from "./CpuScheduler"
import TinyQueue from "tinyqueue"
import Process from "../models/Process"

export default class HighestResponseRatioNext extends CpuScheduler {
  protected calculate(): void {
    const total = this.processes.length
    const waitingQueue = new TinyQueue<Process>(this.processes, (a, b) => a.arrivalTime - b.arrivalTime)
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

        this.timeWindows.push(process.stop(time + process.serviceTime))

        this.data.push(process)
        doneProcesses++

        time += process.serviceTime
      } else {
        time++
      }

    }
  }
}