import CpuScheduler from "./CpuScheduler"
import TinyQueue from "tinyqueue"
import Process from "../models/Process"

export default class MultilevelFeedbackQueue extends CpuScheduler {
  constructor() {
    super(true, 2)
  }

  protected calculate(): void {
    const total = this.processes.length
    const quantum1 = this.quantumList[0]
    const quantum2 = this.quantumList[1]
    const waitingQueue = new TinyQueue<Process>(this.processes, (a, b) => {
      if (a.arrivalTime - b.arrivalTime === 0)
        return b.index - a.index
      return a.arrivalTime - b.arrivalTime
    })

    const readyQueue1: Process[] = []
    const readyQueue2: Process[] = []
    const readyQueue3: TinyQueue<Process> = new TinyQueue<Process>([], (a, b) => {
      if (a.arrivalTime - b.arrivalTime === 0)
        return a.index - b.index
      return a.arrivalTime - b.arrivalTime
    })

    let doneProcesses: number = 0
    let time: number = 0

    while (doneProcesses < total) {
      while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
        readyQueue1.push(waitingQueue.pop())


      //  Round Robin 1
      if (readyQueue1.length > 0) {
        const process: Process = readyQueue1.pop()

        process.start = time

        time += Math.min(quantum1, process.remainingTime)
        process.advance(quantum1)
        this.timeWindows.push(process.stop(time))

        while (waitingQueue.length > 0 && waitingQueue.peek().arrivalTime <= time)
          readyQueue1.unshift(waitingQueue.pop())

        if (process.isDone()) {
          this.data.push(process)
          doneProcesses++
        } else {
          readyQueue2.unshift(process)
        }

      } else if (readyQueue2.length > 0) {
        // Round Robin 2
        const process: Process = readyQueue2.pop()

        process.start = time

        time += Math.min(quantum2, process.remainingTime)
        process.advance(quantum2)

        this.timeWindows.push(process.stop(time))

        if (process.isDone()) {
          this.data.push(process)
          doneProcesses++
        } else {
          readyQueue3.push(process)
        }
      } else if (readyQueue3.length > 0) {
        // FCFS
        const process: Process = readyQueue3.pop()

        process.start = time

        time += process.remainingTime
        this.timeWindows.push(process.stop(time))

        process.advance(process.remainingTime)

        this.data.push(process)
        doneProcesses++

      } else {
        time++
      }
    }
  }
}