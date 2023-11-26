<template>
    <div ref="countEl" class="count-block">
        <div class="main-content">
            <template v-for="(item, index) in propsData">
                <div class="count-item">
                    <img class="count-image" :src="item.iconUrl" alt="">
                    <div class="count-number">
                        {{ item.countVal || '00' }}<span class="count-unit">{{ item.unit }}</span>
                    </div>
                    <div class="count-describe">{{ item.describe }}</div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["data"]);
const countEl = ref();


const propsData = ref(JSON.parse(JSON.stringify(props.data)));

let run = false;

onMounted(() => {
    let elTop = countEl.value.offsetTop;
    let startPosition = scrollY + Math.floor(innerHeight/2) + 40;
    if(startPosition > elTop){
        countStart();
    }else{
        window.onscroll = () => {
            startPosition = scrollY + Math.floor(innerHeight/2) + 40;
            if(startPosition > elTop && !run){
                countStart();
            }
        }
    }
});

const countStart = () => {
    let count = 0;
    let allCount = 2000;
    let timer = setInterval(() => {
        count += 50;

        if(count > allCount){
            clearInterval(timer)
            return ;
        }

        
        let dataVal = propsData.value;

        

        dataVal.forEach((/**@type {any} */el) => {
            el.countVal = Math.floor((el.countNum * (count/allCount)))
        });

        propsData.value = dataVal;

        console.log(dataVal,"dataVal",propsData.value)

    }, 50);
    run = true;
}



</script>

<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";
.count-block{
    .main-content{
        @include width($mainWidth);
        @include margin(15, -1);
        @include padding(15, 0);
        display: flex;
        justify-content: space-between;
        .count-item{
            @include padding(15);
            @include margin(0, 10);
            box-sizing: border-box;
            background-color: $defaultBGColor;
            max-width: 50%;
            text-align: center;
            flex: 1;
            .count-image{
                @include margin(15, 0);
            }
        }
        .count-number{
            font-weight: bold;
            @include font(46);
            @include margin(0,15,10,15);
            @include padding(0, 0, 5, 0);
            @include border(solid, $defaultBGColor, 0,0,1,0)
        }
        .count-describe{
            @include padding(10, 0);
            @include font(14);
        }
        .count-unit{
            @include font(14);
            font-weight: 500;
        }
    }
}
</style>
