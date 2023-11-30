<template>
    <online-chat></online-chat>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { isClient } from "@/utils/utils"
import swiperIndex from "@/components/swiper/index.vue";
import itemCountBlock from "@/components/home/itemCountBlock.vue";
import itemImageText from "@/components/home/itemImageText.vue";
import onlineChat from "@/components/onlineChat/index.vue";

const countData = [
    {
        iconUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
        countNum: 10,
        unit: "年",
        describe: "多名超10年经验消防技术专家"
    },{
        iconUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
        countNum: 1000,
        unit: "年",
        describe: "多名超10年经验消防技术专家"
    },{
        iconUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
        countNum: 100,
        unit: "年",
        describe: "多名超10年经验消防技术专家"
    },{
        iconUrl: "http://www.sc-qianye.com/templates/main/images/section1_icon1.png",
        countNum: 500,
        unit: "年",
        describe: "多名超500年经验消防技术专家"
    }
];

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
  title: "关于我们",
  describe: "欢迎来到创新互动，您值得拥有引人注目的在线存在！我们是一支充满激情的专业团队，专注于提供高质量的网站制作解决方案。无论您是创业初期还是成熟企业，我们都能为您量身定制创意、高效的在线平台。团队成员拥有广泛的技能，涵盖前端、后端开发、用户界面设计和数字营销策略。我们通过透明的合作，紧密与客户沟通，力求为您提供卓越的服务和结果。选择创新互动，开启卓越的数字体验之旅！",
  detailsUrl: "javascript:;",
  imgUrl: "http://www.sc-qianye.com/templates/main/images/section5_img.jpg",
  imgAlt: "搜索引擎抓取的内容"
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
