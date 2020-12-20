import * as React from "react"
import SEO from "../../components/seo"
import OSLayout from "./OSLayout"
import { Link } from "gatsby"

export default function IndexPage({ data }) {
  return (
    <OSLayout>
      <SEO title="Operating Systems Time Scheduling Algorithms" />
      <div className="grid grid-cols-2 gap-5">
        <Link to="/os/shortest-remaining-time-first" className="rounded bg-white p-10 text-center text-2xl shadow transform hover:scale-105 transition duration-300">
          Shortest Remaining Time First
        </Link>
        <Link to="/os/FCFS" className="rounded bg-white p-10 text-center text-2xl shadow transform hover:scale-105 transition duration-300">
          Highest Response Ratio Next
        </Link>
        <Link to="/os/FCFS" className="rounded bg-white p-10 text-center text-2xl shadow transform hover:scale-105 transition duration-300">
          Round Robin
        </Link>
        <Link to="/os/FCFS" className="rounded bg-white p-10 text-center text-2xl shadow transform hover:scale-105 transition duration-300">
          Multilevel Feedback Queue
        </Link>
      </div>
    </OSLayout>
  )
}
