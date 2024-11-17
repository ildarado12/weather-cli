const { resolve } = require("path");
const factorial = require("./factorial");
const { rejects } = require("assert");
const { Worker } = require("worker_threads");

const compute = (array) => {
  const arr = [];
  return new Promise((resolve, rejects) => {
    const worker = new Worker("./worker.js", {
      workerData: { array },
    });

    worker.on("message", (msg) => {
      console.log(worker.threadId);
      resolve(msg);
    });

    worker.on("error", (err) => {
      rejects(err);
    });

    worker.on("exit", () => {
      console.log("Завершил работу");
    });
  });
};

const main = async () => {
  try {
    performance.mark("start");

    const result = await Promise.all([
      compute([25, 20, 36, 48, 60, 15]),
      compute([25, 20, 36, 48, 60, 15]),
      compute([25, 20, 36, 48, 60, 15]),
      compute([25, 20, 36, 48, 60, 15]),
    ]);
    console.log(result);

    performance.mark("end");
    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main").pop());
  } catch (e) {
    console.error(e.message);
  }
};

setTimeout(() => {
  console.log("Таймаут");
}, 2000);

main();
