<template><div style="background-color: #f00">
    我要更多的显示
</div></template>
<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log(route.query,route.params,"params")
</script>
<style lang="scss" scoped="scoped"></style>
  