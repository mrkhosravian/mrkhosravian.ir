import * as React from "react"
import {
  DataSet,
  Network,
  Options,
  Data,
} from "vis-network/standalone/esm/vis-network";import { useEffect, useRef } from "react"
import Layout from "../../components/layout"
import {parse as parseQueryString} from 'querystring'

export default function GraphPage(props) {

  const graphString: string = parseQueryString(props.location.search.substr(1)).graph?.toString() || "Nothing"
  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  const network = useRef<Network | null>(null);

  // create an array with nodes
  const nodes = new DataSet([
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" }
  ])

// create an array with edges
  const edges = new DataSet([
    { id: "0", from: 0, to: 1, label: graphString },
    { id: "01", from: 0, to: 2, label: "12" },
    { id: "12", from: 2, to: 1, label: "1" },
    { id: "13", from: 2, to: 4, label: "11" },
    { id: "1", from: 1, to: 3, label: "12" },
    { id: "4", from: 4, to: 3, label: "7" },
    { id: "5", from: 4, to: 5, label: "4/4"},
    { id: "6", from: 3, to: 5, label: "19/19"},
  ], {})


  const data: Data = {
    nodes,
    edges,
  };

  const options: Options = {};

  useEffect(() => {
    if (domNode.current) {
      network.current = new Network(domNode.current, data, options);
    }
  }, [domNode, network, data, options]);

  return (
    <Layout>
      <div className="rounded bg-gray-200" style={{height: "50rem"}}
           ref={domNode}
      />
    </Layout>
  );
}