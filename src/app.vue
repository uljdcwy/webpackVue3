<template>
  <div ref="obj">1阿三发射点发23</div>
  <el-button>我是 ElButton</el-button>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";


console.log(axios,"axios");

const obj = ref();
let test:number = 123;

onMounted(function(){
  console.log(obj,123456)
})
</script>

<style lang="scss" scoped="scoped">
</style>
