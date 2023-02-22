<template>
  <div ref="obj">2456123</div>
</template>
<script setup>
import {onMounted, ref} from "vue";
const obj = ref();
onMounted(function(){
  console.log(obj,"obj")
})
</script>

<style lang="scss">
</style>
