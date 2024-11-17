const { rejects } = require("assert");
const { resolve } = require("path");
const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = (array) => {
  return new Promise((resolve, rejects) => {
    const worker = new Worker("./worker.js", { workerData: { array } });

    worker.on("message", (msg) => {
      resolve(msg);
    });

    worker.on("error", (err) => {
      rejects(err);
    });

    worker.on("exit", () => {
      console.log("Worker exit");
    });
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, rejects) => {
    const forkProcess = fork("fork.js");
    forkProcess.send({ array });

    forkProcess.on("message", (msg) => {
      resolve(msg);
    });

    forkProcess.on("error", (err) => {
      rejects(err);
    });

    forkProcess.on("exit", () => {
      console.log("Fork exit");
    });
  });
};

const main = async () => {
  try {
    performance.mark("startWorker");
    await workerFunction([25, 55, 21, 6]);
    performance.mark("endWorker");
    performance.measure("worker", "startWorker", "endWorker");
    performance.mark("startFork");
    await forkFunction([25, 55, 21, 6]);
    performance.mark("endFork");
    performance.measure("fork", "startFork", "endFork");
  } catch {
    console.error(e.message);
  }
};

main();
