<template>
    <div class="context-block">
        <div class="main-context">
            <div class="context-text">
                <h3 class="vice-title">{{ data.vice }}</h3>
                <h2 class="main-title">{{ data.title }}</h2>
                <span class="title-line"></span>
                <div class="title-describe">
                    {{ data.describe }}
                </div>
                <a :href="data.detailsUrl" class="look-details">了解详情</a>
            </div>
            <div class="context-image">
                <img :src="data.imgUrl" :alt="data.imgAlt">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";


const props = defineProps(["data"]);

/**
 * @type { String }
 */
const bgUrl = props.data.bgUrl;

/**
 * @type { { vice: string, title: string, describe: string, detailsUrl: string, imgUrl: string, imgAlt: string } }
 */
const data = props.data.data;

const bg = `url(${bgUrl})`;


</script>

<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.context-block {
    background-image: v-bind(bg);
    max-width: 100%;
    overflow: hidden;
    @include margin(20, 0);
    @include padding(25, 0);
}


.main-context {
    display: flex;
    background-color:#f00;
    justify-content: space-between;
    background-color: $defaultBGColor;
    box-sizing: border-box;
    .context-text {
        flex: 1;

        .vice-title {
            @include font(30);
            color: $lightColor;
        }

        .title-describe {
            @include font(14);
            @include padding(10, 0)
        }

        .title-line {
            display: block;
            @include width(40);
            @include height(4);
            background-color: $redColor;
        }

        .main-title {
            @include padding(10, 0, 20);
            @include font(42);
        }

        .look-details {
            @include font(14);
            color: $linkColor;
            text-decoration-line: none;

            &:hover {
                color: $hoverColor;
            }
        }

    }

    .context-image {
        width: 50%;

        img {
            max-width: 100%;
        }
    }

    @include width($mainWidth);
    @include margin(20, 1e15);
    @include padding(20)
}

@media screen and (max-width: 640px) {
    .context-block {
        @include margin(10, 0);
        @include padding(10, 0);
    }


    .main-context {
        width: 100%;
        display: block;
        @include margin(10);
        .context-text {
            @include padding(10, 0);
            @include margin(10);
        }

        .context-image {
            width: 100%;
        }
        width: auto;
        @include padding(0);
    }
}
</style>
