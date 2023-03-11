<template>
  <div ref="obj">1阿三发射点发23</div>
  <router-view></router-view>
</template>
<script setup lang="ts">
const { onMounted, ref } = require("vue");
import VueECharts from "VueECharts";

const obj = ref();
let test:number = 123;

onMounted(function(){
  console.warn(obj,123456)
})
</script>

<style lang="scss" scoped="scoped">
</style>
