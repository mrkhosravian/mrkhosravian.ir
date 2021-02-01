export default class MemoryStatus {
  pages: readonly number[]
  referencedPage: number
  faultIndex: number
  hasFault: boolean = false
  pointer: number = 0
  useBits: readonly number[]

  constructor(pages: readonly number[], referencedPage: number, faultIndex: number, hasFault: boolean, pointer?: number, useBits?: readonly number[]) {
    this.pages = pages
    this.referencedPage = referencedPage
    this.faultIndex = faultIndex
    this.hasFault = hasFault

    if (pointer)
      this.pointer = pointer

    if (useBits)
      this.useBits = Array.from(useBits)
  }
}