// 渲染进程 
const { ipcRenderer } = require('electron') 
ipcRenderer.send('fnName',{name:'张三'}); //异步 
// 渲染进程监听主进程广播
ipcRenderer.on("reply",(event,data)=>{
    console.log(data);
})