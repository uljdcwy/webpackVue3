<template>
  <div class="bg-box"></div>
  <component-header></component-header>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ComponentHeader from "./components/header.vue"


onMounted(function(){
console.log(ComponentHeader,"header")
})
</script>

<style lang="scss" scoped="scoped">
  .bg-box{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(./../public/bg.png);
    background-size: 100% 100%;
  }
</style>
