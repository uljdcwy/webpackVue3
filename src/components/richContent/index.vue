<template>
    <div id="toolbar"></div>
    <div id="editMain" contenteditable = "true" @keyup="getEditorJson" style="height: 120px;background-color: #f00;">
    </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, stringJson, jsonStrToAst } from "./editor.js";
/** @type { any } */
let editMain;
let agentStart = false;
const getEditorJson = (/** @type {any} */ e) => {
  if(agentStart) return;
  setTimeout(() => {
    let ast = getDomJson(editMain);

    console.log(jsonStrToAst(`<div data-v-7334d060 id=\"editMain\" contenteditable=\"true\" style=\"height: 120px; background-color: rgb(255, 0, 0);\" ><p ><span >zhen</span></p><p ><span >gxi2</span></p><p ><span >ya</span></p></div>`).mountToEl("editMain"), "ast 文本内容", ast)
  })
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
