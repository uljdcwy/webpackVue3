import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const test = require("./build/Release/testReturn.node");
console.log(test.testFn(),"test")