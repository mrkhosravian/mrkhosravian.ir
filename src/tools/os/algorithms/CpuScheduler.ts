import Frame from "../models/Frame"
import Process from "../models/Process"
import { ConvertedData } from "../models/ConvertedData"
import { convertData } from "../../../helper/os/helpers"

export interface CpuSchedulerInterface {
  run(inputString)
}

export default abstract class CpuScheduler implements CpuSchedulerInterface {

  protected timeWindows: Frame[] = []
  protected data: Process[] = []
  protected processes: Process[]
  protected quantumList: number[]
  private readonly hasQuantum: boolean
  private readonly quantumCount: number

  constructor(hasQuantum: boolean = false, quantumCount: number = 0) {
    this.hasQuantum = hasQuantum
    this.quantumCount = quantumCount
  }

  run(inputString) {
    try {
      const convertedData: ConvertedData = convertData(inputString, this.hasQuantum, this.quantumCount)
      this.processes = convertedData.processes
      this.quantumList = convertedData.quantumList
    } catch (e) {
      // console.log(e)
      return { data: this.data, timeWindows: this.timeWindows }
    }

    this.calculate()

    return { data: this.data, timeWindows: this.timeWindows }
  }

  protected abstract calculate(): void
}