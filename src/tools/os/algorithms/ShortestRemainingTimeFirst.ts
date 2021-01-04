import CpuScheduler from "./CpuScheduler"
import TinyQueue from "tinyqueue"
import Process from "../models/Process"
import Frame from "../models/Frame"

export default class ShortestRemainingTimeFirst extends CpuScheduler {
  protected calculate(): void {
    const total = this.processes.length
    const waitingQueue = new TinyQueue<Process>(this.processes, (a, b) => a.arrivalTime - b.arrivalTime)
    const readyQueue = new TinyQueue<Process>([], (a, b) => {
      if (a.remainingTime - b.remainingTime === 0)
        return a.arrivalTime - b.arrivalTime
      else return a.remainingTime - b.remainingTime
    })
    let doneProcesses: number = 0
    let time: number = 0

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
            this.timeWindows.push(frame)
          }
          process.start = time
        }

        time++
        process.advance(1)

        if (process.isDone()) {
          this.timeWindows.push(new Frame(process.start, time, process.processName))
          doneProcesses++
          process.stop(time)
          this.data.push(readyQueue.pop())
          lastProcess = null
        } else {
          lastProcess = process
        }
      } else {
        time++
      }
    }
  }
}