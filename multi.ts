import * as dotenv from "dotenv";
import cluster from "node:cluster";
import http from "node:http";
import { availableParallelism } from "node:os";
import process from "node:process";

dotenv.config();

let port = process.env.PORT;
const counter = port ? +port : 3000;

if (cluster.isPrimary) {
  for (let i = 0; i < availableParallelism(); i++) {
    cluster.fork({ WORKER_PORT: counter + i });
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const port = process.env.WORKER_PORT;

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "success" }));
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
