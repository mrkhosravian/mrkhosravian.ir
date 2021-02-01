import PageReplacer from "./PageReplacer"
import MemoryStatus from "../../models/MemoryStatus"

export default class LeastRecentlyUsed extends PageReplacer {
  protected calculate(): void {
    // first page
    const pages = Array(this.framesCount).fill(null)
    const LRU = []
    pages[0] = this.references[0]
    LRU.push(this.references[0])
    let memoryStatus = new MemoryStatus(pages, this.references[0], 0, true)
    this.increasePageFault()

    this.timeWindows.push(memoryStatus)
    let lastMemoryStatus = memoryStatus
    let fullPages = 1

    for (let i = 1; i < this.references.length; i++) {

      const referencedPage = this.references[i]

      //  search for page if exists
      if (lastMemoryStatus.pages.includes(referencedPage)) {
        memoryStatus = new MemoryStatus(lastMemoryStatus.pages, referencedPage, -1, false)

        // update LRU
        const ind = LRU.indexOf(referencedPage)
        LRU.splice(ind, 1)
        LRU.push(referencedPage)

        // there is free space for page
        //  replace if not exists
      } else if (fullPages < this.framesCount) {
        this.increasePageFault()
        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, fullPages),
          referencedPage,
          ...lastMemoryStatus.pages.slice(fullPages + 1)
        ], referencedPage, fullPages, true)

        LRU.push(referencedPage)

        fullPages++
      } else {
        //  frames are full

        // get page index to replace from LRU
        const pageToReplaceIndex = lastMemoryStatus.pages.indexOf(LRU.shift())
        LRU.push(referencedPage)

        this.increasePageFault()
        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, pageToReplaceIndex),
          referencedPage,
          ...lastMemoryStatus.pages.slice(pageToReplaceIndex + 1)
        ], referencedPage, pageToReplaceIndex, true)

      }


      lastMemoryStatus = memoryStatus
      this.timeWindows.push(memoryStatus)
    }


    console.log(this.timeWindows)

  }
}