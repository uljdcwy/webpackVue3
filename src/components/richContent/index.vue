<template>
    <div id="toolbar"></div>
    <button class="bold-text" @click="boldSelects">加粗文本</button>
    <div id="editMain" contenteditable = "true" @keyup="getEditorJson" style="height: 120px;background-color: #f00;">
    </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, patch, getSelectContent, bold } from "./editor.js";
/** @type { any } */
let editMain;
let agentStart = false;
/**
 * @type {any[]}
 */
let astDom;
/**@type {*} */
const selectAst = [];
const getEditorJson = (/** @type {any} */ e) => {
  if(agentStart) return;
  setTimeout(() => {
    // @ts-ignore
    patch(astDom, getDomJson(editMain));
  })
};

const boldSelects = () => {
  if(!selectAst[0]){
    selectAst.push(...getSelectContent(astDom, selectAst));
  }
  bold(selectAst);
  patch(astDom, getDomJson(editMain));
  console.log(astDom,"astDom")
}

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
  console.log(selectAst,"selectAst")
  selectAst.push(...getSelectContent(astDom, selectAst));
  console.log(selectAst,"selectAst")
  selected = false;
};

const mousemove = (/** @type {any} */ e) => {
    selected = true;
};


onMounted(() => {
  editMain = document.getElementById("editMain");
  astDom = getDomJson(editMain);

  editMain.addEventListener("mousedown", mousedown);
  window.addEventListener("mouseup", mouseup);
  
  editMain.addEventListener("compositionstart", startAgentFn);
  editMain.addEventListener("compositionend", endAgentFn);
});

onUnmounted(() => {
  editMain.removeEventListener("compositionstart", startAgentFn);
  editMain.removeEventListener("compositionend", endAgentFn);
  
  window.removeEventListener("mouseup", mouseup);
  editMain.removeEventListener("mousedown", mousedown);
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
  #editMain{
    min-height: 160px;
    overflow-y: scroll;
  }
</style>
