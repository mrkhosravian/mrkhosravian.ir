import PageReplacer from "./PageReplacer"
import MemoryStatus from "./MemoryStatus"

export default class Optimal extends PageReplacer {
  protected calculate(): void {
    // first page
    const pages = Array(this.framesCount).fill(null)
    pages[0] = this.references[0]
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

        // search for optimal page
        let j = i + 1
        let Optimal = Array.from(lastMemoryStatus.pages)
        while (j < this.references.length && Optimal.length > 1) {
          let number = this.references[j]
          const ind = Optimal.indexOf(number)
          if (ind !== -1)
            Optimal.splice(ind, 1)
          j++
        }

        // get the index of optimal
        const pageToReplaceIndex = lastMemoryStatus.pages.indexOf(Optimal.pop())

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