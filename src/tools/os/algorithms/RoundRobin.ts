import CpuScheduler from "./CpuScheduler"
import TinyQueue from "tinyqueue"
import Process from "../models/Process"

export default class RoundRobin extends CpuScheduler {


  constructor() {
    super(true, 1)
  }

  protected calculate(): void {
    const total = this.processes.length
    const quantum = this.quantumList[0]
    const waitingQueue = new TinyQueue<Process>(this.processes, (a, b) => a.arrivalTime - b.arrivalTime)
    const readyQueue: Process[] = []
    let doneProcesses: number = 0
    let time: number = 0

    while (doneProcesses < total) {
      while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
        readyQueue.unshift(waitingQueue.pop())

      if (readyQueue.length > 0) {
        const process: Process = readyQueue.pop()

        process.start = time

        time += quantum > process.remainingTime ? process.remainingTime : quantum
        process.advance(quantum)

        this.timeWindows.push(process.stop(time))

        while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
          readyQueue.unshift(waitingQueue.pop())

        if (process.isDone()) {
          this.data.push(process)
          doneProcesses++
        } else {
          readyQueue.unshift(process)
        }

      } else {
        time++
      }
    }
  }
}