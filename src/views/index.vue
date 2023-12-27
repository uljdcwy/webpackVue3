<template>
    <vue-swiper :data="swiperData"></vue-swiper>
    
</template>
<script setup>
import vueSwiper from "@/components/swiper/index.vue";
import banner1 from "@public/banner1.jpg";
import banner2 from "@public/banner2.jpg";
import banner3 from "@public/banner3.jpg";


const swiperData = [
    {
        alt: "测试图片",
        src: banner1,
    },
    {
        alt: "测试地址",
        src: banner2,
    },
    {
        alt: "测试路径",
        src: banner3,
    }
]
</script>
<style lang="scss" scoped="scoped">
</style>
  