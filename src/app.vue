<template>
  <div ref="obj">123</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
const obj = ref();
let test:number = 123;
test = 123456
console.log(obj);

onMounted(function(){
})
</script>

<style lang="scss" scoped="scoped">
</style>
