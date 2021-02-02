import * as React from "react"
import Layout from "../../components/layout"
import { Link } from "gatsby"

export default function GraphPage() {
  return (
    <Layout>
      <h2 className="text-4xl mb-20">Graphs & Graph Algorithms</h2>
      <ul className="list-disc list-inside underline text-blue-600">
        <li><Link to={"/graph/ford-fulkerson"}>Ford Fulkerson Algorithm</Link>
        </li>
      </ul>
    </Layout>
  )
}