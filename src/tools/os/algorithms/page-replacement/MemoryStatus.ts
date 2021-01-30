export default class MemoryStatus {

  pages: readonly number[]
  referencedPage: number
  faultIndex: number
  hasFault: boolean = false


  constructor(pages: readonly number[], referencedPage: number, faultIndex: number, hasFault: boolean) {
    this.pages = pages
    this.referencedPage = referencedPage
    this.faultIndex = faultIndex
    this.hasFault = hasFault
  }
}