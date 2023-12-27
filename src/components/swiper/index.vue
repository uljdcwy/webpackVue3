<template>
    <swiper :modules="modules" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" effect="fade" :spaceBetween="30" :navigation="true" :pagination="{
        clickable: true,
    }" :loop="true" @swiper="onSwiper" @slideChange="onSlideChange">
        <template v-for="(item, index) in data">
            <swiper-slide class="swiper-item"><img class="swiper-img" :src="item.src" :alt="item.alt"></swiper-slide>
        </template>
    </swiper>
</template>
<script setup>
import { onMounted, ref, inject } from "vue";
import { isClient } from "@/utils/utils"
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/vue';
// @ts-ignore
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';

const props = defineProps(['data']);

/**
 * @type { {alt: string, src: string}[] }
 */
const data = props.data;

const onSlideChange = () => {

}


const onSwiper = (/** @type {any} */ swiper) => {
};

const modules = [EffectFade, Navigation, Pagination, Autoplay];

// @ts-ignore
if (isClient()) {
    onMounted(() => {
    })
}
</script>

<style lang="scss" scoped="scoped">
.swiper-item{
    .swiper-img{
        width: 100%;
        height: auto;
    }
}



@media screen and (max-width: 640px) {
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev){
        display: none;
    }
}
</style>
