import PageReplacer from "./PageReplacer"
import MemoryStatus from "../../models/MemoryStatus"

export default class FirstInFirstOut extends PageReplacer {
  protected calculate(): void {
    // first page
    const pages = Array(this.framesCount).fill(null)
    pages[0] = this.references[0]
    let memoryStatus = new MemoryStatus(pages, this.references[0], 0, true)
    this.increasePageFault()
    this.timeWindows.push(memoryStatus)

    let lastMemoryStatus = memoryStatus
    let pageToReplaceIndex = 0
    let fullPages = 1

    for (let i = 1; i < this.references.length; i++) {

      const referencedPage = this.references[i]

      //  search for page if exists
      if (lastMemoryStatus.pages.includes(referencedPage)) {
        memoryStatus = new MemoryStatus(lastMemoryStatus.pages, referencedPage, -1, false)
        // there is free space for page
        //  replace if not exists
      } else if (fullPages < this.framesCount) {
        this.increasePageFault()
        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, fullPages),
          referencedPage,
          ...lastMemoryStatus.pages.slice(fullPages + 1)
        ], referencedPage, fullPages, true)

        fullPages++
      } else {
        //  frames are full
        this.increasePageFault()
        memoryStatus = new MemoryStatus([
          ...lastMemoryStatus.pages.slice(0, pageToReplaceIndex),
          referencedPage,
          ...lastMemoryStatus.pages.slice(pageToReplaceIndex + 1)
        ], referencedPage, pageToReplaceIndex, true)

        pageToReplaceIndex = (pageToReplaceIndex + 1) % this.framesCount
      }


      lastMemoryStatus = memoryStatus
      this.timeWindows.push(memoryStatus)
    }
  }
}