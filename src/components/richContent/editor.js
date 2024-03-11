// 获取DOM的JSON树
export const getDomJson = (rootDom = document.body) => {
    return breadthCycle(rootDom, null);
};
// 字符串化JSON
export const stringJson = (/** @type {{ children: any; attrs: { [x: string]: string; }; tag: any; }} */ json) => {
    let str = "";
    let childrens = json.children;
    if (Array.isArray(childrens)) {
        childrens.forEach((el) => {
            str += stringJson(el);
        });
        let attr = "";
        for (let key in json.attrs) {
            if (json.attrs[key]) {
                attr += key + '="' + json.attrs[key] + '" ';
            } else {
                attr += key + ' ';
            }
        }
        return `<${json.tag} ${attr}>${str}</${json.tag}>`;
    } else {
        return `${json.children}`
    }
};
// 更新
export const patch = (/** @type {{ children: any; el: { nodeType: string; parent: { replaceChild: (arg0: any, arg1: any) => void; }; }; }} */ oldVdom, /** @type {{ children: any; el: any; }} */ newVdom) => {

};
// 节点类型
const nodeTypes = {
    "1": "tag",
    "3": "text",
};
// 获取惟一键
const getuuid = (/** @type {number} */ len) => {
    const uuids = "qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOPASDFGHJKLZXCVBNM";
    let key = "";
    let lens = uuids.length;
    for (let i = 0; i < len; i++) {
        key += uuids[Math.floor(Math.random() * lens)]
    };
    return key;
};
// 获取属性
/**
 * 
 * @param {*} el 
 * @param {*} nodeType 
 * @returns 
 */
const getAttrs = (el, nodeType) => {
    /** @type {any} */
    let oAttr = {};
    if(typeof el == "string") {
        el = el.trim();
        el = el.replace(/([a-zA-z ]+)=(("|')[^"']+("|'))/g, (/** @type {any} */ a,/** @type {string} */ b,/** @type {string} */ c) => {
            oAttr[b.trim()] = c.trim();
            return "";
        });

        let elAttr = el.split(" ");
        elAttr.map((/** @type {string} */ key) => {
            oAttr[key.trim()] = "";
        })


    } else {
        const attrs = el.attributes;
        if (nodeType == 'tag') {
            let attrLen = attrs.length;
            for (let i = 0; i < attrLen; i++) {
                oAttr[attrs[i].nodeName] = attrs[i].nodeValue;
            };
        }
    }
    return oAttr;
};
// 深度循环
const deepLoop = (/** @type {string | any[] | NodeListOf<ChildNode>} */ domEls, /** @type {any[] | undefined} */ root, /** @type {{ nodeType: any; tag: string | undefined; el: HTMLElement; key: string; children: never[]; parent: undefined; attrs: any; selected: never[]; } | undefined} */ parent) => {
    let elsLen = domEls.length;
    for (let i = 0; i < elsLen; i++) {
        // @ts-ignore
        breadthCycle(domEls[i], root, parent);
    }
};
// 广度循环
// @ts-ignore
const breadthCycle = (/** @type {HTMLElement} */ domEl, root = [], /** @type {undefined} */ parent) => {
    const childrens = domEl.childNodes;
    const nodeType = nodeTypes[domEl.nodeType];
    let elVDom = {
        nodeType: nodeType,
        tag: toLocalLow(domEl.tagName, nodeType),
        el: domEl,
        key: getuuid(24),
        children: [],
        parent: parent,
        attrs: getAttrs(domEl, nodeType),
        selected: []
    };
    if (childrens.length > 0) {
        deepLoop(childrens, elVDom.children, elVDom);
    } else {
        elVDom.children = getTextContent(domEl, nodeType);
        replaceSpecify(elVDom);
    };
    root = root && root.push(elVDom) || elVDom;
    return root
};
// 小写字符串
const toLocalLow = (/** @type {string} */ str, /** @type {string} */ nodeType) => {
    if (nodeType == "tag") {
        return str.toLocaleLowerCase()
    }
};
// 获取文本内容
const getTextContent = (/** @type {{ innerText: string; nodeValue: string; }} */ domEl, /** @type {any} */ nodeType) => {
    let child = "";
    switch (nodeType) {
        case 'tag':
            child = domEl.innerText;
            break;
        case "text":
            child = domEl.nodeValue;
            break;
    };
    return child
};
// 替换特殊内容
const replaceSpecify = (/** @type {{ nodeType?: any; tag?: any; el?: any; key?: string; children?: any; parent: any; attrs?: any; selected?: never[]; }} */ elVDom) => {
    if (elVDom.parent && elVDom.parent.tag == "div") {
        replacePToDIVElement(elVDom);
    } else if (hasParagraph(elVDom)) {
        if (elVDom.parent.tag != 'span') {
            replaceSpanToTextElement(elVDom);
        }
    } else {
        addParagraph(elVDom);
    }
};
// 当前当前文本是否有段落
// @ts-ignore
const hasParagraph = (/** @type {{ parent: { tag: string; }; }} */ vDom) => {
    if (!vDom.parent) {
        return false;
    } else if (vDom.parent.tag == 'p') {
        return true;
    } else if (vDom.parent.tag != 'p') {
        return hasParagraph(vDom.parent);
    }
};
// 将DIV标签替换成P
const replacePToDIVElement = (/** @type {{ parent?: any; el?: any; attrs?: any; tag?: any; children?: any; }} */ elVDom) => {
    let divVdom = elVDom.parent;
    if (!divVdom.parent) {
        if(divVdom.tag != 'span'){
            const p = document.createElement("p");
            const span = document.createElement("span");
            p.appendChild(span);
            divVdom.el.replaceChild(p, elVDom.el);
            span.append(elVDom.el);
            const jsonToDiv = getDomJson(p);
            patchAttrs(jsonToDiv, elVDom);
            patchJson(elVDom, jsonToDiv);
            moveCursorToEnd(p);
        }
        return;
    };
    const p = document.createElement("p");
    const span = document.createElement("span");
    p.appendChild(span);
    divVdom.parent.el.replaceChild(p, divVdom.el);
    span.append(elVDom.el);
    const jsonToDiv = getDomJson(p);
    patchAttrs(jsonToDiv, divVdom);
    console.log(divVdom,"divVdom")
    patchJson(divVdom, jsonToDiv);
    moveCursorToEnd(p);
};

const patchJson = (/** @type {{ tag?: any; parent?: { tag: string; } | { el: Node; }; el?: any; children?: any; }} */ oldJson, /** @type {any[]} */ newJson) => {
    oldJson.tag = newJson.tag;
    oldJson.el = newJson.el;
    oldJson.children = newJson.children;
}

// 添加段落标签
const addParagraph = (/** @type {{ parent: { tag: string; }; el: { cloneNode: (arg0: boolean) => any; }; }} */ elVDom) => {
    if (!elVDom.parent) return;
    const p = document.createElement("p");
    let getDomCopy;
    if (elVDom.parent.tag == "span") {
        const parentVDOM = elVDom.parent;
        // @ts-ignore
        if(!parentVDOM.parent) return ;
        // @ts-ignore
        getDomCopy = parentVDOM.el.cloneNode(true);
        p.appendChild(getDomCopy);
        let appendJson = getDomJson(p);
        // @ts-ignore
        parentVDOM.parent.el.replaceChild(p, parentVDOM.el);
        patchJson(parentVDOM, appendJson);
    } else {
        const parentVDOM = elVDom.parent;
        const span = document.createElement("span");
        getDomCopy = elVDom.el.cloneNode(true);
        p.appendChild(span);
        span.appendChild(getDomCopy);
        let appendJson = getDomJson(p);
        // @ts-ignore
        parentVDOM.el.replaceChild(p, elVDom.el);
        patchJson(elVDom, appendJson);
    };
    moveCursorToEnd(p);
};
// 将没有span包住的文本元素替换成SPAN包住的文本元素
const replaceSpanToTextElement = (/** @type {{ el: { cloneNode: (arg0: boolean) => any; }; parent: { el: Node; }; }} */ elVDom) => {
    const span = document.createElement("span");
    const cloneText = elVDom.el.cloneNode(true);
    span.appendChild(cloneText);
    console.log(elVDom,"elVDom")
    // @ts-ignore
    elVDom.parent.el.replaceChild(span, elVDom.el);
    const replaceJson = getDomJson(span);
    patchJson(elVDom, replaceJson);
    moveCursorToEnd(elVDom.parent.el);
};
// 更新属性
const patchAttrs = (/** @type {any[]} */ oldVdom, /** @type {{ attrs: any; }} */ newVdom) => {
    let oldAttr = oldVdom.attrs;
    let newAttr = newVdom.attrs;
    let resetUndefined;
    if (!oldAttr && !newAttr) return;

    oldAttr = oldAttr || {};
    newAttr = newAttr || {};

    for (let key in oldAttr) {
        if (newAttr[key] !== resetUndefined && oldAttr[key] != newAttr[key]) {
            oldAttr[key] = newAttr[key];
            oldVdom.el.setAttribute(key, newAttr[key]);
            delete newAttr[key];
        } else {
            delete oldAttr[key];
            oldVdom.el.removeAttribute(key);
        }
    };
    for (let key in newAttr) {
        oldAttr[key] = newAttr[key];
        oldVdom.el.setAttribute(key, newAttr[key]);
    }
};

// 更新文本
const patchText = (/** @type {{ children: any; el: { nodeType: string; parent: { replaceChild: (arg0: any, arg1: any) => void; }; }; }} */ oldVdom, /** @type {{ children: any; el: any; }} */ newVdom) => {
    if (typeof oldVdom.children == 'string' && !Array.isArray(newVdom.children) && newVdom.children != oldVdom.children || typeof newVdom.children == 'string') {
        oldVdom.children = newVdom.children;
        let updateElem = oldVdom.el.nodeType == 'text' ? oldVdom.el.parent : oldVdom.el;
        updateElem.innerText = newVdom.children;
    } else if (Array.isArray(oldVdom.children) && Array.isArray(newVdom.children)) {
        patch(oldVdom, newVdom);
    } else {
        oldVdom.el.parent.replaceChild(newVdom.el, oldVdom.el);
    }
};
// 到动光标到当前元素的最后方
const moveCursorToEnd = (/** @type {Node} */ element) => {
    var range = document.createRange();
    var selection = window.getSelection();

    // 将 Range 设置为编辑元素的最后
    range.selectNodeContents(element);
    range.collapse(false);

    // 清除当前 Selection 并将 Range 添加到 Selection 中
    selection.removeAllRanges();
    selection.addRange(range);

    // 设置焦点到编辑元素
    element.focus();
};
// 鼠标按下的状态
let selectStatus = false;
// 在 select 移动时 记录移动的 AST 指向 并在selected 中记录选中的开始位置与结束位置 只记录段落
const selectAst = [];

// 选择开始时
const selectStart = () => {
    selectStatus = true;
    return selectStatus;
};
// 选择移动时
const selectMove = (/** @type {any} */ e) => {
    if(!selectStatus) return ;
    // 标记选择 文本 或内容放到 selected  
    console.log(e, "查看选择的元素")
    // 在鼠标未松开时每移动一下获取选择的内容与当前元素做比较，如果有将选择的内容添加到选择
    // 当进行特定操作时对选择内容进行操作
};
// 选择结束时
const selectEnd = () => {
    selectStatus = false;
    return selectStatus;
};

// 将字符串化的 json 格式化为 AST;
/**
 * 
 * @param {string} str 
 */
export const jsonStrToAst = (str) => {
    /** @type {any} */
    let runObj = {};
    /** @type {any} */
    let activeObject;

    runObj.originSource = str;
    runObj.tagReg = /^<\/?([^>]+)>/i;
    runObj.textReg = /([^<]+)</i;
    runObj.offsetLeft = 0;
    runObj.tagStack = [];
    runObj.ast = null;
    runObj.__proto__.mountToEl = mountToEl;
    let i = 0;
    
    while(str) {
        /** @type {any} */
        let startMatch = str.match(runObj.tagReg);
        /** @type {string} */
        let tagMark = startMatch && startMatch[0];
        let tagName = startMatch && startMatch[1];
        let isEndTag = str.startsWith(tagMark) && str.startsWith("</");
        let subStrLen = tagMark && tagMark.length || 0;
        let strlen = str.length;
        /** @type {any} */
        let tagProps = tagName && tagName.replace(/\S+/, (/** @type {any} */ a) => {
            tagName = a;
            return "";
        });
        let nodeType;



        /** @type {any} */
        let initObject = {
            nodeType: 1,
            tag: tagName,
            position: [runObj.offsetLeft],
            key: getuuid(24),
            children: [],
            parent: null,
            attrs: null,
            selected: []
        };

        if(isEndTag) {
            let popStack = activeObject;
            if(popStack.tag == tagName){
                activeObject.position.push(runObj.offsetLeft + subStrLen)
                activeObject = activeObject.parent
            }else{
                subStrLen = 0;
                runObj.tagStack.push(popStack);
                console.warn("标签对错误 标签名称：" + popStack.tag + "; 标签位置：" + runObj.offsetLeft);
            }
        } else if(str.startsWith(tagMark)){
                
            initObject.tag = tagName;
            initObject.attrs = getAttrs(tagProps, nodeType);
            
            if(activeObject){
                let pushObject = Array.isArray(activeObject) ? activeObject : activeObject.children;
                pushObject.push(initObject);
                initObject.parent = activeObject;
                activeObject = activeObject.children[activeObject.children.length - 1];
            }else{
                initObject.parent = null;
                runObj.tagStack.push(initObject);
                activeObject = runObj.tagStack[0];
            }
            let currentElement = document.createElement(tagName);
            initObject.parent && initObject.parent.el.appendChild(currentElement);
            initObject.el = currentElement;
        }else{
            let textMatch = str.match(runObj.textReg);
            /** @type {any} */
            let textContent = textMatch && textMatch[1];
            subStrLen = textContent.length || 0;
            initObject.nodeType = 3;
            initObject.parent = activeObject;
            initObject.tag = null;
            initObject.children = textContent;
            initObject.position = [runObj.offsetLeft, runObj.offsetLeft + subStrLen];
            activeObject.children = initObject;
            let currentTextNode = document.createTextNode(textContent);
            initObject.parent && initObject.parent.el.appendChild(currentTextNode);
            initObject.el = currentTextNode
        };
        str = str.substring(subStrLen, strlen);
        runObj.offsetLeft += subStrLen;
    }
    return runObj;
}

const mountToEl = /**
 * @this {any}
 */
 function (/** @type {string} */ idName) {
    let idElement = document.getElementById(idName);
    this.tagStack[0].children.map((/** @type {{ el: any; }} */ el) => {
        // @ts-ignore
        idElement.appendChild(el.el);
    })
}

// 判断是自闭合标签
/**
 * 
 * @param {string|null} tag 
 * @returns 
 */
const isSelfClosing = (tag) => {
    let status = false;
    switch(tag){
        case "br":
        case "img":
        case "hr":
        case "input":
            status = true;
            break;
        default:
            status = false;
            break;
    };
    return status;
}

// 更新 字符串 AST 到 DOM

// 修复替换元素出现的 BUG 调整中

// 粘帖功能调整