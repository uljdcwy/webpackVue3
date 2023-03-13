<template>
  div123465
   "aabb" {{count}}
</template>

<script setup>
import { useStore } from "vuex";

const {state: { count } } = useStore();

console.log(count,"count")
</script>

<style scoped>

</style>