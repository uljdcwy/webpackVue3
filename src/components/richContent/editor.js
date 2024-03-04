// 获取DOM的JSON树
export const getDomJson = (rootDom = document.body) => {
    return breadthCycle(rootDom, null);
};
// 字符串化JSON
export const stringJson = (json) => {
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
export const patch = (oldVdom, newVdom) => {

};
// 节点类型
const nodeTypes = {
    "1": "tag",
    "3": "text",
};
// 获取惟一键
const getuuid = (len) => {
    const uuids = "qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOPASDFGHJKLZXCVBNM";
    let key = "";
    let lens = uuids.length;
    for (let i = 0; i < len; i++) {
        key += uuids[Math.floor(Math.random() * lens)]
    };
    return key;
};
// 获取属性
const getAttrs = (el, nodeType) => {
    const attrs = el.attributes;
    let oAttr;
    if (nodeType == 'tag') {
        oAttr = {};
        let attrLen = attrs.length;
        for (let i = 0; i < attrLen; i++) {
            oAttr[attrs[i].nodeName] = attrs[i].nodeValue;
        };
    }
    return oAttr;
};
// 深度循环
const deepLoop = (domEls, root, parent) => {
    let elsLen = domEls.length;
    for (let i = 0; i < elsLen; i++) {
        breadthCycle(domEls[i], root, parent);
    }
};
// 广度循环
const breadthCycle = (domEl, root = [], parent) => {
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
const toLocalLow = (str, nodeType) => {
    if (nodeType == "tag") {
        return str.toLocaleLowerCase()
    }
};
// 获取文本内容
const getTextContent = (domEl, nodeType) => {
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
const replaceSpecify = (elVDom) => {
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
const hasParagraph = (vDom) => {
    if (!vDom.parent) {
        return false;
    } else if (vDom.parent.tag == 'p') {
        return true;
    } else if (vDom.parent.tag != 'p') {
        return hasParagraph(vDom.parent);
    }
};
// 将DIV标签替换成P
const replacePToDIVElement = (elVDom) => {
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

const patchJson = (oldJson, newJson) => {
    oldJson.tag = newJson.tag;
    oldJson.el = newJson.el;
    oldJson.children = newJson.children;
}

// 添加段落标签
const addParagraph = (elVDom) => {
    if (!elVDom.parent) return;
    const p = document.createElement("p");
    let getDomCopy;
    if (elVDom.parent.tag == "span") {
        const parentVDOM = elVDom.parent;
        if(!parentVDOM.parent) return ;
        getDomCopy = parentVDOM.el.cloneNode(true);
        p.appendChild(getDomCopy);
        let appendJson = getDomJson(p);
        parentVDOM.parent.el.replaceChild(p, parentVDOM.el);
        patchJson(parentVDOM, appendJson);
    } else {
        const parentVDOM = elVDom.parent;
        const span = document.createElement("span");
        getDomCopy = elVDom.el.cloneNode(true);
        p.appendChild(span);
        span.appendChild(getDomCopy);
        let appendJson = getDomJson(p);
        parentVDOM.el.replaceChild(p, elVDom.el);
        patchJson(elVDom, appendJson);
    };
    moveCursorToEnd(p);
};
// 将没有span包住的文本元素替换成SPAN包住的文本元素
const replaceSpanToTextElement = (elVDom) => {
    const span = document.createElement("span");
    const cloneText = elVDom.el.cloneNode(true);
    span.appendChild(cloneText);
    console.log(elVDom,"elVDom")
    elVDom.parent.el.replaceChild(span, elVDom.el);
    const replaceJson = getDomJson(span);
    patchJson(elVDom, replaceJson);
    moveCursorToEnd(elVDom.parent.el);
};
// 更新属性
const patchAttrs = (oldVdom, newVdom) => {
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
const patchText = (oldVdom, newVdom) => {
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
const moveCursorToEnd = (element) => {
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
const selectMove = (e) => {
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
const jsonStrToAst = () => {

}

// 修复替换元素出现的 BUG 调整中

// 粘帖功能调整