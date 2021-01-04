export default class Frame {
  public start: number
  public end: number
  public name: string

  public toString() {
    return `Process[${this.name}](${this.start},${this.end})`
  }

  constructor(start: number, end: number, name: string) {
    this.start = start
    this.end = end
    this.name = name
  }
}