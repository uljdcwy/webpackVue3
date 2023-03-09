<template>
  <div ref="obj">1阿三发射点发23</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "Vue";
import VueECharts from "VueECharts";

const obj = ref();
let test:number = 123;
console.log(VueECharts,"VueECharts",obj)

onMounted(function(){
})
</script>

<style lang="scss" scoped="scoped">
</style>
