<template>
    <div id="toolbar"></div>
    <div id="editMain" contenteditable="true" @keydown="clearKeyUpKey" @keyup="getEditorJson" style="height: 120px;background-color: #f00;">
    </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, stringJson } from "./editor.js";
/** @type { any } */
let editMain;
let agentStart = false;
const getEditorJson = (e) => {
  window.upKey = e.keyCode;
  if(agentStart) return;
  setTimeout(() => {
    getDomJson(editMain)
  })
};

const clearKeyUpKey = () => {
  window.upKey = null;
};

const startAgentFn = () => {
    agentStart = true;
}
const endAgentFn = () => {
    agentStart = false;
}


onMounted(() => {
  editMain = document.getElementById("editMain");
  getDomJson(editMain);

  editMain.addEventListener("compositionstart", startAgentFn);
  editMain.addEventListener("compositionend", endAgentFn)
});

onUnmounted(() => {
  editMain.removeEventListener("compositionstart", startAgentFn);
  editMain.removeEventListener("compositionend", endAgentFn)
})





</script>

<style lang="scss" scoped>
  #edit-main,
  #toolbar{
    width: 100%;
  }
  #edit-main{
    min-height: 30px;
  }
</style>
