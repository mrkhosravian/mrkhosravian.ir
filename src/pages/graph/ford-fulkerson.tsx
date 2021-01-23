import * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Data,
  DataSet,
  Network,
  Options
} from "vis-network/standalone/esm/vis-network"
import Layout from "../../components/layout"
import { parse as parseQueryString } from "querystring"
import fordFulkerson from "../../tools/graph/ford-fulkerson"

const samplePlaceHolder = `6 \t\t\t\t# total
0 5 \t\t\t# start end
0 1 16 \t\t# from to flow
0 2 13 \t\t# from to flow
1 2 10 \t\t# from to flow
2 1 4 \t\t# from to flow
1 3 12 \t\t# from to flow
2 4 14 \t\t# from to flow
3 2 9 \t\t# from to flow
4 3 7 \t\t# from to flow
3 5 20 \t\t# from to flow
4 5 4 \t\t# from to flow
`

export default function GraphPage(props) {

  const graphString: string = parseQueryString(props.location.search.substr(1)).graph?.toString() || "Nothing"
  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null)

  // A reference to the vis network instance
  const network = useRef<Network | null>(null)

  const [input, setInput] = useState("")

  const { nodes, edges } = calc(input)

  const data: Data = {
    nodes,
    edges
  }

  const options: Options = {}

  useEffect(() => {
    if (domNode.current) {
      network.current = new Network(domNode.current, data, options)
    }
  }, [domNode, network, data, options])

  useEffect(() => {
    if (domNode.current) {
      network.current = new Network(domNode.current, data, options)
    }
  }, [input])

  return (
    <Layout>
      <textarea name="inputGraph" rows={10} className="w-full mb-5 p-5"
                value={input}
                placeholder={samplePlaceHolder}
                onChange={(e) => setInput(e.target.value)}
      />
      <div className="rounded bg-gray-200" style={{ height: "50rem" }}
           ref={domNode}
      />
    </Layout>
  )
}

function calc(input: string) {
  // const graph = [
  //   [0, 16, 13, 0, 0, 0],
  //   [0, 0, 10, 12, 0, 0],
  //   [0, 4, 0, 0, 14, 0],
  //   [0, 0, 9, 0, 0, 20],
  //   [0, 0, 0, 7, 0, 4],
  //   [0, 0, 0, 0, 0, 0]
  // ]

  // const graph = [
  //   [0, 10, 0, 10, 0, 0],
  //   [0, 0, 4, 2, 8, 0],
  //   [0, 0, 0, 0, 0, 10],
  //   [0, 0, 0, 0, 9, 0],
  //   [0, 0, 6, 0, 0, 10],
  //   [0, 0, 0, 0, 0, 0]
  // ]

  // let fordFulkerson1 = fordFulkerson(graph, 0, 5)
  // console.log("The maximum possible flow is " +
  //   fordFulkerson1)

  const sample = `6
0 5
0 1 16
0 2 13
1 2 10
2 1 4
1 3 12
2 4 14
3 2 9
4 3 7
3 5 20
4 5 4`


  let convertedData
  try {
    convertedData = convert(input.length === 0 ? sample : input)
  } catch (e) {
    console.log(e)
    return { nodes: [], edges: [] }
  }

  console.log(convertedData)
  const ff = fordFulkerson(convertedData.graph, convertedData.start, convertedData.end)

  const rGraph = ff.rGraph
  const edgess = []

  // create an array with nodes
  const nodes = new DataSet(
    Array(convertedData.graph.length)
      .fill(undefined)
      .map((it, i) => ({ id: i, label: i.toString() }))
  )
  // const nodes = new DataSet([
  //   { id: 0, label: "0" },
  //   { id: 1, label: "1" },
  //   { id: 2, label: "2" },
  //   { id: 3, label: "3" },
  //   { id: 4, label: "4" },
  //   { id: 5, label: "5" }
  // ])

  // console.log(createEdges(rGraph, convertedData.graph))
  const edges = new DataSet(createEdges(rGraph, convertedData.graph))


  return { nodes, edges }
}

interface Edge {
  id: string
  from: number
  to: number
  label: string
}

function createEdges(rGraph: readonly number[][], graph: readonly number[][]): Edge[] {
  const edges: Edge[] = []
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      if (rGraph[i][j] > 0) {
        edges.push({
          id: i + "." + j,
          from: j,
          to: i,
          label: `${rGraph[i][j]}/${graph[j][i]}`
        })
      }
    }
  }
  return edges
}

function convert(input: string): { start: number; end: number; graph: number[][] } {
  if (input.length === 0) throw new Error("Nothing inserted")
  const inputRows = input.split("\n")
  if (inputRows.length === 1) throw new Error("Too few params")
  const total = Number(inputRows[0].trim())
  const row2 = inputRows[1].trim().split(" ")
  if (row2.length < 2) throw new Error("Sink And To are not correct")
  const startEnd = row2.map(Number)

  const graph = Array(total).fill(undefined).map(it => Array(total).fill(0))
  for (let i = 2; i < inputRows.length; i++) {
    const row = inputRows[i].trim().split(" ").map(Number)
    if (row.length < 3) throw new Error("Incorrect edge")
    graph[row[0]][row[1]] = row[2]
  }
  console.log(graph)
  return { start: startEnd[0], end: startEnd[1], graph }
}