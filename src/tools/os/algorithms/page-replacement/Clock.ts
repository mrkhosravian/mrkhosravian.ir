import PageReplacer from "./PageReplacer"
import MemoryStatus from "../../models/MemoryStatus"

export default class Clock extends PageReplacer {
  protected calculate(): void {
    // first page
    const pages = Array(this.framesCount).fill(null)
    const useBits = Array(this.framesCount).fill(0)
    pages[this.pointer] = this.references[0]
    useBits[this.pointer] = 1
    let memoryStatus = new MemoryStatus(pages, this.references[0], 0, true, (this.pointer + 1) % this.framesCount, useBits)
    this.increasePageFault()

    this.timeWindows.push(memoryStatus)
    let lastMemoryStatus = memoryStatus
    let fullPages = 1
    this.increasePointer()

    for (let i = 1; i < this.references.length; i++) {

      const referencedPage = this.references[i]

      //  search for page if exists
      if (lastMemoryStatus.pages.includes(referencedPage)) {

        //get index of referenced page and set it to 1
        const referencedPageUseBit = lastMemoryStatus.pages.indexOf(referencedPage)
        useBits[referencedPageUseBit] = 1

        // console.log("!!!!", referencedPageUseBit, JSON.parse(JSON.stringify(useBits)))

        memoryStatus = new MemoryStatus(lastMemoryStatus.pages, referencedPage, -1, false, this.pointer, useBits)

        // there is free space for page
        //  replace if not exists
      } else if (fullPages < this.framesCount) {

        this.increasePageFault()

        // update use bits
        useBits[fullPages] = 1

        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, fullPages),
          referencedPage,
          ...lastMemoryStatus.pages.slice(fullPages + 1)
        ], referencedPage, fullPages, true, (this.pointer + 1) % this.framesCount, useBits)


        this.increasePointer()
        fullPages++
      } else {
        //  frames are full

        // search for zero use bit and zero all 1s

        while (useBits[this.pointer] === 1) {
          useBits[this.pointer] = 0
          this.increasePointer()
        }

        useBits[this.pointer] = 1

        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, this.pointer),
          referencedPage,
          ...lastMemoryStatus.pages.slice(this.pointer + 1)
        ], referencedPage, this.pointer, true, (this.pointer + 1) % this.framesCount, useBits)

        this.increasePointer()
        this.increasePageFault()

      }

      lastMemoryStatus = memoryStatus
      this.timeWindows.push(memoryStatus)
    }


    console.log(this.timeWindows)

  }
}