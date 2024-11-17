const factorial = require("./factorial");

const compute = (array) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map((el) => factorial(el));
};

const main = () => {
  performance.mark("start");

  const result = [
    compute([25, 20, 36, 48, 60, 15]),
    compute([25, 20, 36, 48, 60, 15]),
    compute([25, 20, 36, 48, 60, 15]),
    compute([25, 20, 36, 48, 60, 15]),
  ];
  console.log(result);

  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main").pop());
};

setTimeout(() => {
  console.log("Таймаут");
}, 2000);

main();
