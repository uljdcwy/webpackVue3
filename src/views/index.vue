<template>
  <vue-swiper></vue-swiper>
  <count-block></count-block>
  <div id="container"></div>
</template>
<script setup>
import { onMounted } from "vue";
import vueSwiper from "@/components/swiper/index.vue";
import countBlock from "@/components/home/itemCountBlock.vue";
import imageTextBlock from "@/components/home/itemImageText.vue";
import {
  init,
  thunk,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from "snabbdom";

onMounted(() => {

  const patch = init([
    // 通过传入模块初始化 patch 函数
    classModule,
    propsModule,
    styleModule, // 支持内联样式同时支持动画
    eventListenersModule // 添加事件监听
  ]);

  const container = document.getElementById("container");

  const someFn = () => {
    console.log(123)
  }

  


  function numberView(n) {
    console.log(numberView,"numberView")
    return h("div", "Number is: " + n);
  }

  function render(state) {
    console.log(state,"state")
    return thunk("num", numberView, [state.number]);
  }

  const obj = {number: 12};


  const anotherEventHandler = () => {

  }

  let thoukEl = render(obj);

  const vnode = h("div#container.one.classes", { on: { click: someFn } }, [
    h("span", { style: { fontWeight: "bold" } }, "This is bold"),
    " and this is just normal text",
    thoukEl,
    h("a", { props: { href: "/foo" } }, "I'll take you places!")
  ]);
  // 传入一个空的元素节点 - 将产生副作用（修改该节点）
  patch(container, vnode);
  obj.number = 1200;
  const newVnode = h(
    "div#container.two.classes",
    { on: { click: anotherEventHandler } },
    [
      h(
        "span",
        { 
          hook: {
            post: () => {
              console.log("post")
            }
          },
          style: { fontWeight: "normal", fontStyle: "italic" } },
        "This is now italic type"
      ),
      thoukEl,
      " and this is still just normal text",
      h("a", { props: { href: "/bar" }, class: { active: true, selected: false } }, "I'll take you places!")
    ]
  );


  console.log(newVnode,"newVnode")
  setTimeout(() => {
    // 再次调用 `patch`
    patch(vnode, newVnode); // 将旧节点更新为新节点
  }, 10000)
})


</script>
<style lang="scss" scoped="scoped"></style>
  