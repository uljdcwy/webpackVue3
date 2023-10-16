<template>
    <img src="@public/test.png" alt="">
    123456798
</template>
<script setup>
import { onMounted, ref } from "vue";
import com from "@/components/header.vue"
import { store } from "@/store/index.js"
console.log(123456, "store")

onMounted(() => {
})
</script>

<style lang="scss" scoped="scoped"></style>
