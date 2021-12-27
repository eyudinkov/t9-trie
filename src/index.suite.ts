import Benchmark, { Event } from "benchmark";

import { main } from "./index";

const benchmark = new Benchmark.Suite;

benchmark
  .add("T9 Resolver", main)
  .on("cycle", (event: Event) => console.info(String(event.target)))
  .run();
