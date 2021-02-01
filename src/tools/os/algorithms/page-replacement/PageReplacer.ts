import { inputPageReplacementData } from "../../../../helper/os/helpers"
import MemoryStatus from "../../models/MemoryStatus"

export interface PageReplacerInterface {
  run(inputString)
}

export default abstract class PageReplacer implements PageReplacerInterface {
  protected framesCount: number
  protected references: number[]
  protected timeWindows: MemoryStatus[] = []
  private _pageFaults: number = 0
  private _pointer: number = 0

  get pointer(): number {
    return this._pointer
  }

  increasePointer() {
    this._pointer = (this.pointer + 1) % this.framesCount
  }

  run(inputString) {
    try {
      const convertedData = inputPageReplacementData(inputString)
      this.framesCount = convertedData.framesCount
      this.references = convertedData.pages
    } catch (e) {
      console.log(e)
      return { timeWindows: this.timeWindows }
    }

    this.calculate()

    return { timeWindows: this.timeWindows }
  }

  protected abstract calculate(): void

  get pageFaults(): number {
    return this._pageFaults
  }

  protected increasePageFault() {
    this._pageFaults++
  }

}