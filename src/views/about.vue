<template>
    <div class="about">
        <div class="container-about">
            <div class="about-welcome">{{$t("vueAbout.mainblock.welcomeDescribe")}}</div>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const router = useRouter();
const route = useRoute();
const t = useI18n();
</script>
<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";
.container-about{
    @include width($mainWidth);
    @include margin(15, 1e15);
}
.about{
    @include padding(1);
    background-color: $aboutBg;
}
</style>
  