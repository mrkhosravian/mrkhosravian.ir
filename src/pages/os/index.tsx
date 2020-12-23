import * as React from "react"
import SEO from "../../components/seo"
import OSLayout from "../../templates/OSLayout"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import { CpuSchedulers } from "../../constants/os_constants"
import Gantt from "../../components/os/Gantt"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Operating Systems Time Scheduling Algorithms" />
      <div className="container mx-auto px-5 md:px-0">
        <h1 className="text-4xl mb-10">Operating Systems Time Scheduling
          Algorithms</h1>
        <div
          className="my-5 grid md:grid-flow-col grid-cols-2 md:auto-cols-fr gap-5 text-center text-white">
          <Link to="/os/first-come-first-served" title={CpuSchedulers.FCFS_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.FCFS}</Link>
          <Link to="/os/shortest-remaining-time-first"
                title={CpuSchedulers.SRTF_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.SRTF}</Link>
          <Link to="/os/round-robin" title={CpuSchedulers.RR_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.RR}</Link>
          <Link to="/os/highest-response-ratio-next"
                title={CpuSchedulers.HRRN_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.HRRN}</Link>
          <Link to="/os/shortest-job-first" title={CpuSchedulers.SJF_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.SJF}</Link>
          <Link to="/os/multilevel-feedback-queue"
                title={CpuSchedulers.MFQ_FULL}
                className="rounded bg-gray-700 p-2">{CpuSchedulers.MFQ}</Link>
        </div>
      </div>
    </Layout>
  )
}
