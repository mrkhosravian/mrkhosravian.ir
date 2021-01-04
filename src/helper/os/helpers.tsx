import { ConvertedData } from "../../tools/os/models/ConvertedData"
import Process from "../../tools/os/models/Process"

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function convertData(data: string, hasQuantum: boolean, quantumCount: number = 0): ConvertedData {
  if (data.length === 0) throw new Error("length is zero")
  const dataRows = data.split("\n")
  if ((!hasQuantum && dataRows.length > 3) || (hasQuantum && dataRows.length > 3 + quantumCount))
    throw new Error("too many lines")

  if (isNaN(Number(dataRows[0]))) throw new Error("not a number")
  if (dataRows[0].length === 0) throw new Error("wrong process numbers")
  const process: number = Number(dataRows[0])

  if (dataRows[1].length === 0) throw new Error("serviceTimes length is zero")
  let serviceTimesString: string[] = dataRows[1].split(",")
  if (serviceTimesString.length !== process) throw new Error("wrong serviceTimes")
  let serviceTimes: number[] = serviceTimesString.map(it => Number(it.trim()))
  for (const processTime of serviceTimes) {
    if (isNaN(processTime)) throw new Error("Invalid Number")
  }


  if (dataRows[2].length === 0) throw new Error("arrivalTimes length is zero")
  const arrivalTimesString: string[] = dataRows[2].split(",")
  if (arrivalTimesString.length !== process) throw new Error("wrong arrivalTimes")
  let arrivalTimes: number[] = arrivalTimesString.map(it => Number(it.trim()))
  for (const arrivalTime of arrivalTimes) {
    if (isNaN(arrivalTime)) throw new Error("Invalid Number")
  }


  let out: ConvertedData = {
    processes: [],
    quantumList: []
  }

  const quantumList: number[] = []

  if (hasQuantum) {
    for (let i = 3; i < 3 + quantumCount; i++) {
      if (dataRows[i].length === 0) throw new Error("Quantum number is not correct")
      quantumList.push(Number(dataRows[i].trim()))
    }
  }
  out.quantumList = quantumList

  for (let i = 0; i < process; i++) {
    out.processes.push(new Process(String(i + 1), arrivalTimes[i], serviceTimes[i], i))
  }
  return out
}