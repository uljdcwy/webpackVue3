<template>
  <div ref="obj">1阿三发射点发23</div>
  <router-view></router-view>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import VueECharts from "VueECharts";

const obj = ref();
let test:number = 123;

onMounted(function(){
  console.warn(obj,123456)
})
</script>

<style lang="scss" scoped="scoped">
</style>
