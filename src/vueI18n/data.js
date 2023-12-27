// @ts-ignore
import logo from "@public/logo.png";
export default {
    zh: {
        test: "测试",
        vueFooter: {
            Filing: `©2022 xxxxxxxx有限公司 版权所有 备案号：粤ICP备xxxxxx号 技术支持：<a href="javascript:;">曾细亚</a>`,
            telTips: "24小时服务热线",
            tel: "15827328113",
            logoUrl: logo,
            navTips: "致力于打造人工智能智慧生活",
            homeLink: "",
            homeText: "首页",
            telText: "电话资询",
            goTopText: "置顶",
            searchPlaceholder: "请输入搜索关键词",
            searchText: "搜索",
            logoAlt: "提示alt",
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "首页",
                    link: ""
                },
                {
                    title: "产品中心",
                    link: ""
                },
                {
                    title: "解决方案",
                    link: ""
                },
                {
                    title: "工程案例",
                    link: ""
                },
                {
                    title: "品牌介绍",
                    link: ""
                },
                {
                    title: "新闻资讯",
                    link: ""
                }
            ]))
        },
        vueHeader: {
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "首页",
                    link: "/?lang=zh",
                    name: "",
                    query: {lang: 'zh'},
                },
                {
                    title: "产品中心",
                    link: "/test?lang=zh",
                    name: "",
                    query: {lang: 'zh'},
                    childList: [
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        },
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        },
                        {
                            title: "标题",
                            icon: "",
                            childNav: [
                                {
                                    title: "标题",
                                    link: ""
                                },
                                {
                                    title: "子路由",
                                    link: ""
                                }]
                        }

                    ]
                },
                {
                    title: "解决方案",
                    link: "/other?lang=zh",
                    name: "",
                    query: {lang: 'zh'}
                },
                {
                    title: "工程案例",
                    link: ""
                },
                {
                    title: "品牌介绍",
                    link: ""
                },
                {
                    title: "新闻资讯",
                    link: ""
                }
            ])),
            tel: "0755-23646330",
            logoUrl: logo,
            searchPlaceholder: "请输入搜索关键词",
        }
    },
    en: {
        test: "test",
        vueFooter: {
            Filing: `Co., Ltd. All rights reserved Registration number: Guangdong ICP No. xxxxxx Technical support：<a href="javascript:;">Zeng Xiya</a>`,
            telTips: "24-hour service hotline",
            tel: "15827328113",
            logoUrl: logo,
            navTips: "Committed to creating a smart life with artificial intelligence",
            homeLink: "",
            homeText: "home",
            telText: "tel talk",
            goTopText: "go top",
            logoAlt: "tip alt",
            searchPlaceholder: "Enter search keywords",
            searchText: "search",
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "home",
                    link: ""
                },
                {
                    title: "Product Center",
                    link: ""
                },
                {
                    title: "solution",
                    link: ""
                },
                {
                    title: "Project cases",
                    link: ""
                },
                {
                    title: "brand introduction",
                    link: ""
                },
                {
                    title: "news",
                    link: ""
                }
            ]))
        },
        vueHeader: {
            navList: encodeURIComponent(JSON.stringify([
                {
                    title: "home",
                    link: "/?lang=zh"
                },
                {
                    title: "Product Center",
                    link: "",
                    childList: [
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        },
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        },
                        {
                            title: "title",
                            icon: "",
                            childNav: [
                                {
                                    title: "title",
                                    link: ""
                                },
                                {
                                    title: "child router",
                                    link: ""
                                }]
                        }

                    ]
                },
                {
                    title: "solution",
                    link: "/?lang=en"
                },
                {
                    title: "Project cases",
                    link: ""
                },
                {
                    title: "brand introduction",
                    link: ""
                },
                {
                    title: "news",
                    link: ""
                }
            ])),
            tel: "0755-23446330",
            logoUrl: logo,
            searchPlaceholder: "Enter search keywords",
        }
    }
}

export const langList = [
    {
        lang: "zh",
        text: "中文"
    },
    {
        lang: "en",
        text: "English"
    },
]