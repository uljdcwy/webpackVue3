<template>
    <div class="context-block">
        <div class="main-context">
            <div class="main-left">
                <div class=""></div>
            </div>
            <div class="main-right">
                <img src="http://www.sc-qianye.com/templates/main/images/section5_img.jpg" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const props = defineProps(['bgUrl']);

    /**
     * @type { String }
     */
    const bgUrl = props.bgUrl || "";

    const bg = `url(${bgUrl})`;

    
</script>

<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.context-block{
    background-image: v-bind(bg);
}

.main-context {
    @include width($mainWidth);
    @include margin(0, -1);
    @include padding(20)
}
</style>
