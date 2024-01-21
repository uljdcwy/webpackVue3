// 渲染进程 
const { ipcRenderer } = require('electron') 
ipcRenderer.send('fnName',{name:'张三'}); //异步;

let inputEl;
let audio

window.addEventListener('DOMContentLoaded', () => {
    
  inputEl = document.getElementById("videoInput");

  inputEl.onchange = () => {
    localStorage.setItem("videoSrc", inputEl.value);
  }

  inputEl.value = localStorage.getItem("videoSrc");
  audio = document.createElement("video");
  });

// 渲染进程监听主进程广播
ipcRenderer.on("reply",(event,data)=>{
    if(inputEl.value){
        localStorage.setItem("videoSrc", inputEl.value);
    }
    audio.src = inputEl.value;
    document.body.appendChild(audio);
    audio.play();
})