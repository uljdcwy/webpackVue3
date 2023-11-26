<template>
    <div class="banner">
        <swiper-index :data="swiperData"></swiper-index>
    </div>
    <main-context :editData="editData" bgUrl="http://www.sc-qianye.com/templates/main/images/section5_bg.jpg"></main-context>
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

const editData  = {
  vice: "about",
  title: "关于千页",
  describe: "四川千页科技股份有限公司，是一家集研发、制造、销售于一体的新型技术企业，涉足储能预警、储能消防系统、电池舱自动灭火装置等产品，专注为电化学储能、电力电网、文物古建筑、轨道交通、石油石化、应急消防等各行业提供个性化的消防技术解决方案。",
  detailsUrl: "javascript:;",
  imgUrl: "http://www.sc-qianye.com/templates/main/images/section5_img.jpg",
  imgAlt: ""
}

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
