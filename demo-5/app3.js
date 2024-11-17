const { spawn } = require("child_process");

const childProcess = spawn("dir");

childProcess.stdout.on("data", (data) => {
  console.log(`Stdout: ${data}`);
});

childProcess.stderr.on("data", (data) => {
  console.log(`Stderror: ${data}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});
