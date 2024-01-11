<template><div style="background-color: #f00">
    我要更多的显示

    {{ $t("test") }}
</div></template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const router = useRouter();
const route = useRoute();
const t = useI18n();
</script>
<style lang="scss" scoped="scoped">
    
</style>
  