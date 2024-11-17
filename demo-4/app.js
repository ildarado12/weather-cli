const perfHooks = require("perf_hooks");

test = perfHooks.performance.timerify(test);

const performanceObserver = new perfHooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
    const entry = items.getEntriesByName("slow").pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
  }
);

performanceObserver.observe({ entryTypes: ["measure", "function"] });

function test() {
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
}

function slow() {
  performance.mark("start");
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
  performance.mark("end");
  performance.measure("slow", "start", "end");
}

slow();
test();
