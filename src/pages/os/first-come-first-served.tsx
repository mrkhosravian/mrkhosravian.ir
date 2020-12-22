import * as React from "react"
import { useState } from "react"
import OSLayout from "./OSLayout"
import SEO from "../../components/seo"
import Gantt from "./Gantt"
import { Frame, Process } from "../../models/os/types"
import TinyQueue from "tinyqueue"

const sample = `5
3, 6, 4, 5, 2
0, 2, 4, 6, 8`

export default function ShortestRemainingTimeFirst() {

  const [inputString, setInputString] = useState("")

  return (
    <OSLayout>
      <SEO title={"First Come First Served"} />
      <h2 className="text-2xl">First Come First Served</h2>
      <textarea name=""
                className="w-full p-3 leading-relaxed whitespace-pre-line"
                onChange={(e) => setInputString(e.target.value)} rows={3}
                placeholder={sample} />
      {/*<Gantt data={data} timeWindows={timeWindows} />*/}
    </OSLayout>
  )
}