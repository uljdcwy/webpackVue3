<template>
    <div class="context-block">
        <div class="main-context">
            <div class="context-text">
                <h3 class="vice-title">{{ editData.vice }}</h3>
                <h2 class="main-title">{{ editData.title }}</h2>
                <span class="title-line"></span>
                <div class="title-describe">
                    {{ editData.describe }}
                </div>
                <a :href="editData.detailsUrl" class="look-details">了解详情</a>
            </div>
            <div class="context-image">
                <img :src="editData.imgUrl" :alt="editData.imgAlt">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["bgUrl", "editData"]);

/**
 * @type { String }
 */
const bgUrl = props.bgUrl;

/**
 * @type { { vice: string, title: string, describe: string, detailsUrl: string, imgUrl: string, imgAlt: string } }
 */
const editData = props.editData;

const bg = `url(${bgUrl})`;


</script>

<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.context-block {
    background-image: v-bind(bg);
    @include margin(20, 0);
    @include padding(25, 0);
}


.main-context {
    display: flex;
    justify-content: space-between;
    background-color: $defaultBGColor;

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
    @include margin(20, -1);
    @include padding(20)
}

@media screen and (max-width: 640px) {
    .context-block {
        background-image: v-bind(bg);
        @include margin(10, 0);
        @include padding(10, 0);
    }


    .main-context {
        background-color: $defaultBGColor;
        width: 100%;
        display: block;
        @include margin(10);
        .context-text {
            @include padding(15);
            @include margin(10);
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
            width: 100%;
            box-sizing: border-box;
            @include padding(20);

            img {
                max-width: 100%;
            }
        }
        width: auto;
        @include padding(0);
    }
}</style>
