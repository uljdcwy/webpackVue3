<template>
    <div id="toolbar"></div>
    <div id="editMain" contenteditable = "true" @keyup="getEditorJson" style="height: 120px;background-color: #f00;">
    </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, patch, getSelectContent } from "./editor.js";
/** @type { any } */
let editMain;
let agentStart = false;
/**
 * @type {any[]}
 */
let astDom;
const getEditorJson = (/** @type {any} */ e) => {
  if(agentStart) return;
  setTimeout(() => {
    // @ts-ignore
    patch(astDom, getDomJson(editMain))
  })
};

const startAgentFn = () => {
    agentStart = true;
};

const endAgentFn = () => {
    agentStart = false;
};

let selected = false;

const mousedown = (/** @type {any} */ e) => {
  editMain.addEventListener("mousemove", mousemove);
  if(e.shiftKey){
    selected = true;
  };
};

const mouseup = () => {
  editMain.removeEventListener("mousemove", mousemove);
  if(selected){
    // get select && add select arr Dom
    getSelectContent();
  };
  selected = false;
};

const mousemove = (/** @type {any} */ e) => {
    selected = true;
};

const dblclick = (/** @type {any} */ e) => {
  getSelectContent();
}


onMounted(() => {
  editMain = document.getElementById("editMain");
  astDom = getDomJson(editMain);

  editMain.addEventListener("mousedown", mousedown);
  window.addEventListener("mouseup", mouseup);
  editMain.addEventListener("dblclick", dblclick);
  
  editMain.addEventListener("compositionstart", startAgentFn);
  editMain.addEventListener("compositionend", endAgentFn);
});

onUnmounted(() => {
  editMain.removeEventListener("compositionstart", startAgentFn);
  editMain.removeEventListener("compositionend", endAgentFn);
  
  window.removeEventListener("mouseup", mouseup);
  editMain.removeEventListener("mousedown", mousedown);
  editMain.removeEventListener("dblclick", dblclick);
});





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
