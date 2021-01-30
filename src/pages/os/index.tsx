import * as React from "react"
import SEO from "../../components/seo"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import {
  CpuSchedulers,
  PageReplacementAlgorithm
} from "../../constants/os_constants"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Operating Systems Time Scheduling Algorithms" />
      <div className="container mx-auto px-5 md:px-0">
        <h1 className="text-4xl mb-10">Operating Systems Algorithms</h1>
        <h2 className="text-2xl mb-10">CPU Time Scheduling Algorithms</h2>
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
        <h2 className="text-2xl mb-10">Page Replacement Algorithms</h2>
        <div
          className="my-5 grid md:grid-flow-col grid-cols-2 md:auto-cols-fr gap-5 text-center text-white">
          <Link to="/os/page-replacement/first-in-first-out"
                title={PageReplacementAlgorithm.FIFO_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.FIFO}</Link>
          <Link to="/os/page-replacement/least-recently-used"
                title={PageReplacementAlgorithm.LRU_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.LRU}</Link>
          <Link to="/os/page-replacement/optimal"
                title={PageReplacementAlgorithm.OPTIMAL_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.OPTIMAL}</Link>
          <Link to="/os/page-replacement/clock"
                title={PageReplacementAlgorithm.CLOCK_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.CLOCK}</Link>
        </div>
      </div>
    </Layout>
  )
}
