<template>
    <div class="chat-write" @click="focusEl">
        <div :class="selectStatus ? 'select-text' : ''" class="chat-write-content">
            <div @input="changeWrite($event)" @keydown="recordKey" @keyup="recordUp" type="hide" ref="writeInput"
                class="input-box" :class="focusStatus ? 'active' : ''" contenteditable="true"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const focusStatus = ref(false);
const writeInput = ref();

/**
 * @type {any}
 */
let recordKeyVal = [];
let selectStatus = ref(false);


let writeStatus = "";
let writePrev = "";
let writeCurrent = "";
let prevNow = 0;

const changeWrite = (/** @type {any} */ e) => {
    let writeData = e.data;
    let inputEl = writeInput.value;
    let isBackspace = recordKeyVal[0] == "Backspace";
    // 此时输入由输入法控制
    if(writeStatus == "Process"){
        writePrev = writeCurrent;
        // 匹配正则
        let currentData = e.data && e.data.replace(/'/g, '') || ""
        let regExpPrev = new RegExp("^" + (writePrev || "") + ".*");
        let regExpCurr = new RegExp("^" + currentData + ".*");
        let isReduce = regExpCurr.test(writePrev);
        // 普通的添加
        let isAdd = regExpPrev.test(currentData);
        let isZhReg = /[\u4e00-\u9fa5]/;
        let isZh = isZhReg.test(e.data);
        let isLow = /[a-z]+/;
        isReduce = isBackspace && isReduce;
        console.log(writePrev,"currentData", isReduce, e.data, isAdd);
        // 输入多个中英混输
        if((currentData && currentData.length > 1) && isZhReg.test(currentData) && isLow.test(currentData)){
            isAdd = true;
        }

        // 使用正则匹配前一个值如果能配如果匹配成功与输入的是小写字母说明在键入中
        if(isAdd && isLow.test(currentData) || isReduce || (isZh && isAdd)){
            prevNow = 0;
            writeCurrent = currentData;
            if((writePrev == e.data || !e.data) && isBackspace){
                writeCurrent = "";
            }
            // 如果有汉字产生 说明输入完成
        }else if(isZh) {
            prevNow = 0;
            
            for(let i = 0; i < (e.data && e.data.length); i++){
                writeText(inputEl, e.data[i]);
            }
            writeCurrent = "";
            // 自定义输入中
        } else {
            let defVal = Date.now() - prevNow;
            // 有时键会自动键入两个以时间区分
            if(defVal > 10){
                writeText(inputEl, e.data);
            }
            prevNow = Date.now();
            writeCurrent = "";
        }
        // 此时输入法由键盘控制直接写入内容
    }else{
        prevNow = 0;
        if(isBackspace){
            deleteText(inputEl);
        }else{
            writeText(inputEl, e.data);
        }
    }
}


const recordKey = (/** @type {any} */ e) => {
    let code = e.code || e.keyCode;
    if (recordKeyVal.indexOf(code) < 0) recordKeyVal.push(code);
    writeStatus = e.key;
    if (recordKeyVal.length == 1) {
        moveInput(recordKeyVal[0]);
    }
    if(focusStatus.value && recordKeyVal.indexOf("ControlLeft") > -1 && recordKeyVal.indexOf("KeyA") > -1 && recordKeyVal.indexOf("ControlLeft") < recordKeyVal.indexOf("KeyA")){
        selectEvent();
    };
};


const pasteData = (/** @type {any} */ event) => {

    // @ts-ignore
    let clipboardData = event && event.clipboardData || window.clipboardData;
    let textData = clipboardData.getData('text');
    let inputEl = writeInput.value;
    for (let i = 0; i < textData.length; i++) {
        writeText(inputEl, textData[i]);
    }
}

const selectEvent = () => {
    selectStatus.value = true;
}

const copyData = () => {
    copyRun();
}

const copyRun = () => {
    // 创建一个新的Range对象，用于选择文本
    var range = document.createRange();
    range.selectNode(writeInput.value);
    // @ts-ignore
    window.getSelection().removeAllRanges(); // 清除之前的选择
    // @ts-ignore
    window.getSelection().addRange(range); // 将新的Range对象添加到选择中
    document.execCommand('copy'); // 执行复制命令
}

const cutData = function(/** @type {any} */ e) {
    copyRun();
    cleanInput();
    writeInput.value.innerText = "";
    writeInput.value.focus();
}

const cleanInput = () => {
    let inputEl = writeInput.value;
    while(inputEl){
        let nextEl = inputEl.nextElementSibling;
        let prevEl = inputEl.previousElementSibling;
        if(nextEl){
            inputEl.parentNode.removeChild(nextEl);
        }else if(prevEl){
            inputEl.parentNode.removeChild(prevEl);
        }else{
            inputEl = null;
        }
    }
}

const recordUp = (/** @type {any} */ e) => {
    recordKeyVal.pop()
}
/**
 * 
 * @param {string} d 
 */
const moveInput = (d) => {
    let inputEl = writeInput.value;
    switch (d) {
        case "ArrowUp":
            let upEl = findPositionEl(inputEl.offsetLeft, getTop(inputEl, "Up"), inputEl, "Up")
            if (upEl) {
                inputEl.parentNode?.insertBefore(inputEl, upEl);
            } else {
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            }
            writeInput.value.focus();
            break;
        case "ArrowDown":
            let downEl = findPositionEl(inputEl.offsetLeft, getTop(inputEl, "Down"), inputEl, "Down")
            if (downEl) {
                inputEl.parentNode?.insertBefore(inputEl, downEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            break;
        case "ArrowRight":
            if (inputEl.nextElementSibling && inputEl.nextElementSibling.nextElementSibling) {
                let targetEl = inputEl.nextElementSibling.nextElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            break;
        case "ArrowLeft":
            if (inputEl.previousElementSibling) {
                let targetEl = inputEl.previousElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
                return;
            }else{
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            };
            writeInput.value.focus();
            break;
        default:
            break;
    }
}

/**
 * 
 * @param {number} left
 * @param {number} inputTop 
 * @param {HTMLElement} el 
 * @param {string} Dir
 */
const findPositionEl = (left, inputTop, el, Dir) => {
    let currentEl = Dir == "Down" ? el.nextElementSibling : el.previousElementSibling;
    // previousElementSibling;
    // nextElementSibling
    while (currentEl) {
        // @ts-ignore
        let difT;
        // @ts-ignore
        let difL = currentEl.offsetLeft - left;
        if (Dir == "Down") {
            // @ts-ignore
            difT = currentEl.offsetTop - inputTop;
            currentEl = currentEl.nextElementSibling;
        } else {
            // @ts-ignore
            difT = currentEl.offsetTop - inputTop;
            currentEl = currentEl.previousElementSibling;
        };
        if (Math.abs(difT) < 6 && Math.abs(difL) < 6) {
            return currentEl;
            break;
        };
    };
    return null;
}

/**
 * 
 * @param {HTMLElement} el 
 * @param {string} Dir 
 * @returns {number}
 */
const getTop = (el, Dir) => {
    let top;
    let height;
    if (el.previousElementSibling) {
        // @ts-ignore
        height = el.previousElementSibling.offsetHeight;
    } else if (el.nextElementSibling) {
        // @ts-ignore
        height = el.nextElementSibling.offsetHeight;
    } else {
        height = el.offsetHeight;
    }
    if (Dir == "Down") {
        top = (el.offsetTop + height);
    } else {
        top = (el.offsetTop - height);
    }
    return top;
}
const deleteText = (/** @type {HTMLElement} */ el) => {
    /**
     * @type {any}
     */
    let removeEl = el.previousSibling;
    while (removeEl) {
        if (removeEl.nodeType != 1) {
            removeEl = removeEl.previousSibling;
        } else {
            removeEl.parentNode.removeChild(removeEl);
            removeEl = null;
        }
    }
}
/**
 * @type { any }
 */
let timer = null;
/**
 * 
 * @param {HTMLElement} position 
 * @param {string} data 
 */
const writeText = (position, data) => {
    let el = document.createElement("span");
    if (data == ' ') {
        el.innerHTML = "&nbsp;";
    } else {
        el.innerText = data;
    }
    el.className = "text-span";
    el.onclick = replaceWrite;
    position.parentNode?.insertBefore(el, position);
    clearTimeout(timer);
    timer = setTimeout(() => {
        updateInputVal();
    },1000);
}

const updateInputVal = () => {
    let inputEl = writeInput.value;
    let childNodesList = inputEl.parentNode.childNodes;
    /**
     * @type {string[]}
     */
    let textContext = [];
    childNodesList.forEach((/** @type {any} */ el, /** @type {any} */ idx) => {
        textContext.push(el.innerText)
    });
    let text = textContext.join("");
    /**
     * @type {any}
     */
    let selection = window.getSelection();
        // 创建一个 Range 对象
    let range = document.createRange();
    console.log(text.length,"text")
    // 设置 Range 对象的起始位置（这里设置在第 3 个字符之后）
    range.setStart(writeInput.value.firstChild, 6); // 2 是起始位置，表示第 3 个字符

    // 折叠 Range 对象，将光标放在起始位置
    range.collapse(true);

    // 将 Range 对象添加到 Selection 对象中
    selection.removeAllRanges();
    selection.addRange(range);
    // console.log(childNodesList[0].innerText,"childNodesList",textContext.join(""))
}

const replaceWrite = /**
* @this {any}
*/function (/** @type {any} */ e) {
        /**
         * @type {any}
         */
        let that = this;
        setTimeout(() => {
            that.parentNode?.insertBefore(writeInput.value, that.nextSibling);
            writeInput.value.focus();
        })
    }

const hideFocus = () => {
    writeInput.value.addEventListener("paste", pasteData);
    writeInput.value.addEventListener("copy", copyData);
    writeInput.value.addEventListener("cut", cutData);
    selectStatus.value = false;
    focusStatus.value = true;
};

const hideBlur = () => {
    writeInput.value.removeEventListener("paste", pasteData);
    writeInput.value.removeEventListener("copy", copyData);
    writeInput.value.removeEventListener("cut", cutData);
    selectStatus.value = false;
    focusStatus.value = false;
}

const focusEl = () => {
    writeInput.value.parentNode.appendChild(writeInput.value);
    writeInput.value.focus();
}

onMounted(() => {
    writeInput.value.addEventListener("focus", hideFocus);
    writeInput.value.addEventListener("blur", hideBlur);
});

onUnmounted(() => {
    writeInput.value.blur();
    writeInput.value.removeEventListener("focus", hideFocus);
    writeInput.value.removeEventListener("blur", hideBlur);
})

</script>
<style lang="scss" scoped>
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

:deep(.text-span) {
    display: inline-block;
}

.chat-write {
    @include height(160);
    cursor: text;
    background-color: #f00;
    box-sizing: border-box;
    @include padding(10, 0);
    overflow: hidden;
    word-break: break-word;
    :deep(.select-text){
        .text-span{
            user-select: none;
            background-color: $chatSelectBG;
            color: $chatSelectColor
        }
    }
    .chat-write-content {
        @include position(relative, 0, 0, 0, 0);
        @include padding(0, 10);
        overflow-y: scroll;
        width: calc(100% + 18px);
        box-sizing: border-box;
        max-height: 100%;
        .active{
            /**animation: flashing 1s infinite; */
        }
        .input-box {
            text-wrap: nowrap;
            user-select: none;
            overflow: hidden;
            color: #fff;
            
            /** opacity: 0; */
            background-color: #000;
            @include width(200);
            @include margin(0, -1);
            outline: none;
            overflow: hidden;
            border: none;
            @include padding(0);
            background-color: #000;
            display: inline-block;
            vertical-align: bottom;
        }
    }
}


@keyframes flashing {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>