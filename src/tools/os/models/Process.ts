import Frame from "./Frame"

export interface ProcessInterface {
  processName: string
  arrivalTime: number
  serviceTime: number
  index: number
}

export default class Process implements ProcessInterface {
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

  index: number
  arrivalTime: number
  processName: string
  serviceTime: number
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

  constructor(name: string, arrivalTime: number, serviceTime: number, index: number) {
    this.processName = name
    this.arrivalTime = arrivalTime
    this.serviceTime = serviceTime
    this._remainingTime = serviceTime
    this.index = index
  }

  public isDone():boolean {
    return this._remainingTime === 0
  }

  public advance(n: number): number {
    return this._remainingTime = Math.max(this._remainingTime - n, 0)
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

  public getResponseRatio(time: number): number {
    return 1 + ((time - this.arrivalTime) / this.serviceTime)
  }
}