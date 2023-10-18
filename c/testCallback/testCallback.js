const test = require("./build/Release/testCallback.node");
console.log("test",test(() => {
    console.time("c");
    for(let i = 0;i < 100000000; i++){
        
    }
    console.timeEnd("c")
}))
console.time("js");
for(let j = 0;j < 100000000; j++){
    
}
console.timeEnd("js")
