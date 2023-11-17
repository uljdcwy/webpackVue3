const {
    Worker, isMainThread, parentPort, workerData,
  } = require('node:worker_threads');
// @ts-ignore
const test = require("./build/release/winMouseEvent.node");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("test",test['startMonitorMouse']((/** @type {any} */ downStatus,/** @type {any} */ x,/** @type {any} */ y,/** @type {any} */ e) => {
    rl.question(`${downStatus},${x},${y},${e}`, (answer) => {
      rl.close();
    });
}));


