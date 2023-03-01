<template>
  <div ref="obj">2456123</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import "@/test.ts"
const obj = ref();

let obj1:number = 123;
obj1 = 456

onMounted(function(){
})
</script>

<style lang="scss">
</style>
