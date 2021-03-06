export enum CpuSchedulers {
  SRTF_FULL = "Shortest Remaining Time First",
  FCFS_FULL = "First Come First Served",
  RR_FULL = "Round Robin",
  HRRN_FULL = "Highest Response Ratio Next",
  SJF_FULL = "Shortest Job First",
  MFQ_FULL = "Multilevel Feedback Queue ",
  SRTF = "SRTF",
  FCFS = "FCFS",
  RR = "RR",
  HRRN = "HRRN",
  SJF = "SJF",
  MFQ = "MFQ"
}


export enum PageReplacementAlgorithm {
  FIFO_FULL = "First In First Out",
  FIFO = "FIFO",
  LRU_FULL = "Least Recently Used",
  LRU = "LRU",
  CLOCK_FULL = "Clock",
  CLOCK = "CLOCK",
  OPTIMAL_FULL = "Optimal",
  OPTIMAL = "OPTIMAL"
}