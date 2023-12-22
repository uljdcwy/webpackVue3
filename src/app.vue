<template>
    <vue-header @search="searchContent"></vue-header>
    123{{ searchValue }}
    <div style="height: 800px">
    123456</div>
    {{ searchValue }}
    <vue-footer @search="searchContent"></vue-footer>
</template>
<script setup>
import { isClient } from "@/utils/utils";
// @ts-ignore
import vueFooter from "@/components/footer/index.vue"
// @ts-ignore
import vueHeader from "@/components/header/index.vue"
import { useI18n } from "vue-i18n";
// @ts-ignore
import bigDataScreen from "@/components/big-data-screen/index.vue";
import { nextTick } from "vue";
import { onMounted, ref } from "vue";

const t = useI18n();

const searchValue = ref();



onMounted(() => {
})

const searchContent = (val) => {
    console.log(val,"val");
    searchValue.value = val;
}
</script>

<style lang="scss" scoped="scoped"></style>
