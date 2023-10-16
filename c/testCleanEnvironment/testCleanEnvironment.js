import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const test = require("./build/Release/testCleanEnvironment.node");
console.log(test,"test")