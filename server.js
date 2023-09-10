const express = require("express");

const cluster = require("node:cluster");
const os = require("node:os");
//  how many worker_threads we want to spawn
//  i have 8 cores, so i will spawn 8 worker_threads
const TotalCPUs = os.cpus().length;
// console.log(`Total CPUs: ${TotalCPUs}`);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < TotalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  const PORT = 8000;

  app.get("/", (req, res) => {
    res.json({
      message: `hellow from Express Server ${process.pid} 🚀`,
    });
  });

  app.listen(PORT, () =>
    console.log(`Server listening on port http://localhost:${PORT}`)
  );
}
//   console.log(`Worker ${process.pid} started`);
