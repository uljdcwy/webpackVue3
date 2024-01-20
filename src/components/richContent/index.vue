<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor :maxLength="120" style="height: 500px; overflow-y: hidden;" id="editorEl" ref="editorElRef"
            v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
        {{ editorConfig.placeholder }}
    </div>
</template>

<script setup>

import { onBeforeUnmount, ref, shallowRef, onMounted, reactive, effect } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('');

const editorElRef = ref();

const mode = ref("default");
// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        // editorRef.value.dangerouslyInsertHtml(`<i class="fa fa-check" style="color: blue">123</i>`)
        // editorConfig.value = { placeholder: "123456789" };
        // console.log(123456789, editorRef.value)
    }, 3000);
});

const toolbarConfig = {};

const editorConfig = ref({
    placeholder: '请输入内容...' ,
    MENU_CONF: {
        bgColor: {
            colors: ['#f00', '#f00', '#f00']
        },
        lineHeightList: ['1', '1.5', '2', '2.5']
    }
});

effect(() => {
    let editorDom = document.getElementById("editorEl");
    let placeholderDep = editorConfig.value.placeholder;
    if (editorDom) {
        let placeHolderDom = editorDom.getElementsByClassName("w-e-text-placeholder")[0];
        placeHolderDom.innerText = placeholderDep;
    }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style lang="scss" scoped>
@import '@wangeditor/editor/dist/css/style.css' // 引入 css
</style>
