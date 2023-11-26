<template>
    <div class="banner">
        <swiper-index :data="swiperData"></swiper-index>
    </div>
    <main-context></main-context>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { isClient } from "@/utils/utils"
import swiperIndex from "@/components/swiper/index.vue"
import mainContext from "@/components/mainContext/index.vue"

const props = defineProps(["initData"]);

const swiperData = [{
    src: "http://www.sc-qianye.com/upload/202309/21/202309211646025463.jpg",
    alt: "搜索引擎抓取的内容"
},{
    src: "http://www.sc-qianye.com/upload/202309/06/202309061535422479.jpg",
    alt: "搜索引擎抓取的内容"
},{
    src: "http://www.sc-qianye.com/upload/202309/21/202309211009276131.jpg",
    alt: "搜索引擎抓取的内容"
}]

// @ts-ignore   获取SSR传过来的初始化的数据
let ssrData = ref(props.initData || global._INIT_DATA_);

// @ts-ignore
if (isClient()) {
    onMounted(() => {
    })
}
</script>

<style lang="scss" scoped="scoped">

</style>
