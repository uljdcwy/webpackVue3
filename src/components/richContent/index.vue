<template>
    <div contentEditable="true" id="testEdit" @keypress="pringKey" style="height: 300px;">
    </div>
</template>

<script setup>
import * as slate from 'slate';
import {
  init,
  toVNode,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from "snabbdom";
import { onMounted } from 'vue';

const pringKey = (event) => {
  console.log(event)
   return false;
}

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
]);

console.log(slate,"slate")

onMounted(() => {

  const container = document.getElementById("testEdit");

  const editEl = toVNode(container);

  editEl.children = [h('p#container.two.classes', { }, [
    h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
    ' and this is just normal text',
    h('a', { props: { href: '/foo' } }, "I'll take you places!")
  ])];
  console.log(editEl,"editEl")
  // Patch into empty DOM element – this modifies the DOM as a side effect
  patch(container, editEl);

  
  const updateEl = toVNode(document.getElementById("testEdit"));
  console.log(updateEl,"updateEl")
})

</script>

<style lang="scss" scoped>
</style>
