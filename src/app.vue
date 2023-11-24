<template>
    <div>
        123456798
        <button>点击事件</button>
        {{ ssrData }}  ssrData
    </div>
    <router-view></router-view>
    <com></com>
</template>
<script setup>
import { onMounted, ref, inject } from "vue";
import com from "@/components/header.vue";
import { isClient } from "@/utils/utils"

const props = defineProps(["initData"]);

// @ts-ignore   获取SSR传过来的初始化的数据
let ssrData = ref(props.initData || global._INIT_DATA_);

// @ts-ignore
if (isClient()) {
    onMounted(() => {

    })
}
</script>

<style lang="scss" scoped="scoped">
div {
    background-color: #f00;
}
</style>
