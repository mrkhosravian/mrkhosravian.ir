import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import { CpuSchedulers } from "../constants/os_constants"
import SEO from "../components/seo"
import Gantt from "../components/os/Gantt"
import { FaGithub } from "react-icons/fa"
import Layout from "../components/layout";

export default function OSLayout({
                                   rows,
                                   title,
                                   data,
                                   timeWindows,
                                   sample,
                                   setInputString,
                                   githubUrl
                                 }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title={title} />
      <div className="container mx-auto px-5 md:px-0">
        <h1 className="text-2xl md:text-4xl bold mb-10">Operating Systems Time
          Scheduling
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
        <div
          className="flex md:justify-between my-10 md:items-center flex-col md:flex-row">
          <h2 className="text-2xl md:text-4xl mb-5 md:mb-0">{title}</h2>
          <a href={githubUrl}
             className="py-3 px-8 bg-gray-900 text-white rounded hover:bg-gray-500 text-lg text-center"
             target="_blank">
            <FaGithub className="inline-block mr-5" />
            View Code
          </a>
        </div>
        <textarea name=""
                  className="w-full p-3 leading-relaxed whitespace-pre-line"
                  onChange={(e) => setInputString(e.target.value)} rows={rows}
                  placeholder={sample} />
        <Gantt data={data} timeWindows={timeWindows} />
      </div>
    </Layout>
  )
}
