function bfs(rGraph, s, t, parent) {
  const visited: boolean[] = []
  const queue = []
  const V = rGraph.length
  // Create a visited array and mark all vertices as not visited
  for (let i = 0; i < V; i++) {
    visited[i] = false
  }
  // Create a queue, enqueue source vertex and mark source vertex as visited
  queue.push(s)
  visited[s] = true
  parent[s] = -1

  while (queue.length != 0) {
    const u = queue.shift()
    for (let v = 0; v < V; v++) {
      if (visited[v] == false && rGraph[u][v] > 0) {
        queue.push(v)
        parent[v] = u
        visited[v] = true
      }
    }
  }
  //If we reached sink in BFS starting from source, then return true, else false
  return (visited[t] == true)
}

export default function fordFulkerson(graph, s, t) {
  let v
  let u
  if (s < 0 || t < 0 || s > graph.length-1 || t > graph.length-1){
    throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid sink or source")
  }
  if(graph.length === 0){
    throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph")
  }
  const rGraph = []
  for (u = 0; u < graph.length; u++) {
    const temp = []
    if(graph[u].length !== graph.length){
      throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph. graph needs to be NxN")
    }
    for (v = 0; v < graph.length; v++) {
      temp.push(graph[u][v])
    }
    rGraph.push(temp)
  }
  const parent = []
  let maxFlow = 0

  while (bfs(rGraph, s, t, parent)) {
    let pathFlow = Number.MAX_VALUE
    for (v = t; v != s; v = parent[v]) {
      u = parent[v]
      pathFlow = Math.min(pathFlow, rGraph[u][v])
    }
    for (v = t; v != s; v = parent[v]) {
      u = parent[v]
      rGraph[u][v] -= pathFlow
      rGraph[v][u] += pathFlow
    }

    maxFlow += pathFlow
  }

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      const r = rGraph[i][j]
      const g = graph[i][j]
      if (r > 0 && r == g) rGraph[i][j] = 0
      if (r > 0 && graph[j][i] == 0) rGraph[i][j] = 0
    }
  }

  // Return the overall flow and rGraph
  return { maxFlow, rGraph }
}