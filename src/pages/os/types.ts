export interface ProcessInterface {
  processName: string
  arrivalTime: number
  serviceTime: number
  // turnaroundTime: number
  // responseTime: number
  // waitingTime: number
}

export class Frame {
  public start: number
  public end: number
  public name: string

  public toString() {
    return `Process[${this.name}]{${this.start},${this.end}}`
  }

  constructor(start: number, end: number, name: string) {
    this.start = start
    this.end = end
    this.name = name
  }
}

export class Process implements ProcessInterface {
  get start(): number {
    return this._start
  }

  set start(value: number) {
    this._start = value
  }

  public stop(time: number): Frame {
    let frame = new Frame(this.start, time, this.processName)
    this.frames.push(frame)
    return frame
  }
  arrivalTime: number
  processName: string
  serviceTime: number
  private responseTime: number
  private turnaroundTime: number
  private waitingTime: number
  finishedTime: number
  private _remainingTime: number
  private _start: number
  private frames: Frame[] = []

  get remainingTime(): number {
    return this._remainingTime
  }

  public equals(other: Process): boolean {
    if (other === null) return false
    return this.processName === other.processName
  }

  constructor(name: string, arrivalTime: number, serviceTime: number) {
    this.processName = name
    this.arrivalTime = arrivalTime
    this.serviceTime = serviceTime
    this._remainingTime = serviceTime
  }

  public isDone():boolean {
    return this._remainingTime === 0
  }

  public advance(n: number): number {
    return this._remainingTime -= n
  }

  public getResponseTime(): number {
    return this.frames[0].start - this.arrivalTime
  }

  public getTurnaroundTime(): number {
    return this.frames[this.frames.length - 1].end - this.arrivalTime
  }

  public getWaitingTime(): number {
    return this.getTurnaroundTime() - this.serviceTime
  }

  public addFrame(frame: Frame) {
    this.frames.push(frame)
  }

}