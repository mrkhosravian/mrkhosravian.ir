import CpuScheduler from "./CpuScheduler"
import TinyQueue from "tinyqueue"
import Process from "../models/Process"
import Frame from "../models/Frame"

export default class ShortestJobFirst extends CpuScheduler {
  protected calculate(): void {
    const total = this.processes.length
    const waitingQueue = new TinyQueue<Process>(this.processes, (a, b) => {
      if (a.arrivalTime - b.arrivalTime === 0)
        return b.index - a.index
      return a.arrivalTime - b.arrivalTime
    })

    const readyQueue: TinyQueue<Process> = new TinyQueue<Process>([], (a, b) => {
      if (a.serviceTime - b.serviceTime === 0)
        return a.index - b.index
      return a.serviceTime - b.serviceTime
    })

    let doneProcesses: number = 0
    let time: number = 0

    while (doneProcesses < total) {
      while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
        readyQueue.push(waitingQueue.pop())

      if (readyQueue.length > 0) {
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