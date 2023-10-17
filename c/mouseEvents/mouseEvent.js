const {
    Worker, isMainThread, parentPort, workerData,
  } = require('node:worker_threads');
const test = require("./build/release/winMouseEvent.node");


setTimeout(() => {
    console.log("test",test['startMonitorMouse']((downStatus,x,y,e) => {
        console.log("回调执行了",downStatus,x,y,e)
        if(e == "right down") process.exit(1)
    }));
},1000);
