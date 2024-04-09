// 获取DOM的JSON树
// @ts-ignore
export const getDomJson = (rootDom = document.body, deepArr = []) => {
    // @ts-ignore
    return breadthCycle(deepArr, rootDom, null);
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
export const patch = (/** @type {any[]} */ oldVdom, /** @type {any[]} */ newVdom) => {
    // 比较旧的VDOM与新的VDOM将有差异的收集到数组，后更新数组数据，在初次比较时更新特殊标签的处理
    // @ts-ignore
    updateChildrenSpecifyNode(newVdom)
    // @ts-ignore
    let hasChildren = Array.isArray(newVdom && newVdom.children);
    if (oldVdom && newVdom) {
        // @ts-ignore
        let oldP = oldVdom.parent;
        // @ts-ignore
        let newP = newVdom.parent;

        // @ts-ignore
        patchAttrs(oldVdom, newVdom);

        // @ts-ignore
        if (oldP && newP) {
            // @ts-ignore
            if (oldVdom.tag != newVdom.tag) {
                // @ts-ignore
                patchJson(oldVdom, newVdom);
                // @ts-ignore
            } else if (!hasChildren && newVdom.children != oldVdom.children) {
                // @ts-ignore
                patchJson(oldVdom, newVdom);
                // @ts-ignore
            } else if (oldVdom.children.length != newVdom.children.length) {
                // @ts-ignore
                patchJson(oldVdom, newVdom);
            };
        };
        // diff oldVdom or newVdom update
        // @ts-ignore
        hasChildren && newVdom.children.forEach((/** @type {any} */ el, /** @type {any} */ idx) => {
            // @ts-ignore
            let status = patch(oldVdom.children[idx], el);
            console.log(status,"status")
            if (status == "add") {
                // @ts-ignore
                oldVdom.children = Array.isArray(oldVdom.children) ? oldVdom.children : [];
                // @ts-ignore
                oldVdom.children.push(el);
            } else if (status == "remove") {
                // @ts-ignore
                oldVdom.children[idx] = null;
            }
        });
        // @ts-ignore
        oldVdom.children && oldVdom.children.filter && (oldVdom.children = oldVdom.children.filter((e) => e));
    } else if (!oldVdom && newVdom) {
        deepUpdateChildrenSpacifyNode(newVdom);
        // update newVdom to oldVdom
        return 'add';
    } else if (oldVdom && !newVdom) {
        // remove oldVdom
        return 'remove';
    }
};

const updateChildrenSpecifyNode = (/** @type {{ nodeType: string; }} */ newVdom) => {
    newVdom && newVdom.nodeType == "text" && newVdom && replaceSpecify(newVdom);
};

// @ts-ignore
const deepUpdateChildrenSpacifyNode = (newVDom) => {
    // @ts-ignore
    newVDom.children && newVDom.children.forEach((elem, idx) => {
        if(Array.isArray(elem.children)){
            deepUpdateChildrenSpacifyNode(elem);
        }else{
            updateChildrenSpecifyNode(elem);
        }
    })
};


const getDiff = (/** @type {any} */ diffArr, /** @type {any} */ oldVdom, /** @type {any} */ newVdom) => {

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
    if (typeof el == "string") {
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
const deepLoop = (/** @type {string | any[] | NodeListOf<ChildNode>} */ domEls, /** @type {any[] | undefined} */ root, /** @type {{ nodeType: any; tag: string | undefined; el: HTMLElement; key: string; position: any[]; children: never[]; parent: undefined; attrs: any; selected: never[]; } | undefined} */ parent, /** @type {any[] | undefined} */ deepArr) => {
    let elsLen = domEls.length;
    for (let i = 0; i < elsLen; i++) {
        // @ts-ignore
        breadthCycle(deepArr, domEls[i], root, parent, i);
    }
};
// 广度循环
// @ts-ignore
const breadthCycle = (deepArr = [], /** @type {HTMLElement} */ domEl, root = [], /** @type {undefined} */ parent, breadthIdx = 0) => {
    const childrens = domEl.childNodes;
    let deepPositionArr = [...deepArr].concat(breadthIdx);
    // @ts-ignore
    const nodeType = nodeTypes[domEl.nodeType];
    let elVDom = {
        nodeType: nodeType,
        tag: toLocalLow(domEl.tagName, nodeType),
        el: domEl,
        position: deepPositionArr,
        children: [],
        parent: parent,
        key: getuuid(24),
        attrs: getAttrs(domEl, nodeType),
        selected: null
    };

    if (childrens.length > 0) {
        deepArr.push(breadthIdx);
        // @ts-ignore
        deepLoop(childrens, elVDom.children, elVDom, deepArr);
        deepArr.pop();
    } else {
        // @ts-ignore
        elVDom.children = getTextContent(domEl, nodeType);
        // replaceSpecify(elVDom);
    };
    // @ts-ignore
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
/**
 * 
 * @param {*} elVDom 
 */
const replaceSpecify = (elVDom) => {
    let hasParagraphElem = hasTagName(elVDom, "p");
    let pTag = elVDom.parent && elVDom.parent.tag;
    if (pTag == "div") {
        if(hasParagraphElem){
            console.log("替换时有P标签")
        }
        replacePToDIVElement(elVDom);
    } else if (hasParagraphElem) {
        if (!isRichTag(pTag)) {
            // @ts-ignore
            replaceSpanToTextElement(elVDom);
        }
    } else if (!hasParagraphElem) {
        // @ts-ignore
        addParagraph(elVDom);
    }
};
// 合并根节点下的子节点并将子点节内容分成三级，一级段落，一级span 一级文本
/**
 * 
 * @param {*} textVdom 
 */
const mergeRootChildren = (textVdom) => {
    // 向上递归
    // textVdom.
};
// 查看是否是行级元素否则默认为块级元素
const isInlineElem = () => {

};

const richArr = ["i", "strong", "span", "p"];

// 判断是否是富文本的指定标签
/**
 * 
 * @param {*} tagName 
 * @returns 
 */
const isRichTag = (tagName) => {
    return richArr.indexOf(tagName) > -1;
};
// 当前当前文本是否有段落
/**
 * 
 * @param {*} vDom 
 * @param {*} tagName 
 * @returns {*}
 */
const hasTagName = (vDom, tagName) => {
    if (!vDom.parent) {
        return false;
    } else if (vDom.parent.tag == tagName) {
        return true;
    } else if (vDom.parent.tag != tagName) {
        // @ts-ignore
        return hasTagName(vDom.parent, tagName);
    }
};
// 将DIV标签替换成P
const replacePToDIVElement = (/** @type {{ parent?: any; el?: any; attrs?: any; tag?: any; children?: any; }} */ elVDom) => {
    let divVdom = elVDom.parent;
    const p = createElement("p");
    const span = createElement("span");
    if (!divVdom.parent) {
        if (divVdom.tag != 'span') {
            appendChild(p, span);
            resetDivAttrs(divVdom.el);
            replaceChild(divVdom.el, p, elVDom.el)
            appendChild(span, elVDom.el);
            // @ts-ignore
            const jsonToDiv = getDomJson(p, elVDom.parent.position);
            // @ts-ignore
            patchAttrs(jsonToDiv, elVDom);
            patchJson(elVDom, jsonToDiv);
            if(!divVdom.parent){moveCursorToEnd(p);};
        }
        return;
    };
    appendChild(p, span);
    resetDivAttrs(divVdom.parent.el);
    replaceChild(divVdom.parent.el, p, divVdom.el);
    appendChild(span, elVDom.el);
    const jsonToDiv = getDomJson(p, divVdom.parent.position);
    patchAttrs(jsonToDiv, divVdom);
    patchJson(divVdom, jsonToDiv);
    if(!divVdom.parent){moveCursorToEnd(p);};
};
/**
 * 
 * @param {*} divEl 
 */
const resetDivAttrs = (divEl) => {
    let attrs = divEl.attributes;
    for(let attr of attrs){
        let attrName = attr.split("=")[0];
        divEl.removeAttribute(attrName);
    }
};

const patchJson = (/** @type {{ tag?: any; parent?: { tag: string; } | { el: Node; }; el?: any; children?: any; }} */ oldJson, /** @type {any[]} */ newJson) => {
    // @ts-ignore
    oldJson.tag = newJson.tag;
    // @ts-ignore
    oldJson.nodeType = newJson.nodeType;
    // @ts-ignore
    oldJson.position = newJson.position;
    // @ts-ignore
    oldJson.el = newJson.el;
    // @ts-ignore
    oldJson.children = newJson.children;
    // @ts-ignore
    // newJson.parent && newJson.parent.el && oldJson.parent.el && (oldJson.parent.el = newJson.parent.el);
    updateJsonParentEl(oldJson, newJson);
};

/**
 * 
 * @param {*} oldJson 
 * @param {*} newJson 
 */
const updateJsonParentEl = (oldJson, newJson) => {
    if (oldJson.parent && newJson.parent && newJson.parent.el && oldJson.parent.el) {
        oldJson.parent.el = newJson.parent.el;
        if (newJson.parent.parent) {
            updateJsonParentEl(oldJson.parent, newJson.parent)
        }
    }
};

// 添加段落标签
const addParagraph = (/** @type {{ parent: { tag: string; }; el: { cloneNode: (arg0: boolean) => any; }; }} */ elVDom) => {
    if (!elVDom.parent) return;
    const p = createElement("p");
    let getDomCopy;
    if (elVDom.parent.tag == "span") {
        const parentVDOM = elVDom.parent;
        // @ts-ignore
        if (!parentVDOM.parent) return;
        // @ts-ignore
        getDomCopy = cloneNode(parentVDOM.el, true);
        appendChild(p, getDomCopy);
        // @ts-ignore
        let appendJson = getDomJson(p, parentVDOM.parent.position);
        // @ts-ignore
        replaceChild(parentVDOM.parent.el, p, parentVDOM.el)
        patchJson(parentVDOM, appendJson);
    } else {
        const parentVDOM = elVDom.parent;
        const span = createElement("span");
        getDomCopy = cloneNode(elVDom.el, true);
        appendChild(p, span);
        appendChild(span, getDomCopy);
        // @ts-ignore
        let appendJson = getDomJson(p, elVDom.parent.position);
        // @ts-ignore
        replaceChild(parentVDOM.el, p, elVDom.el);
        patchJson(elVDom, appendJson);
    };
    moveCursorToEnd(p);
};
// 将没有span包住的文本元素替换成SPAN包住的文本元素
const replaceSpanToTextElement = (/** @type {{ el: { cloneNode: (arg0: boolean) => any; }; parent: { el: Node; }; }} */ elVDom) => {
    const span = createElement("span");
    const cloneText = cloneNode(elVDom.el, true);
    appendChild(span, cloneText);
    // @ts-ignore
    replaceChild(elVDom.parent.el, span, elVDom.el)
    // @ts-ignore
    const replaceJson = getDomJson(span, elVDom.parent.position);
    patchJson(elVDom, replaceJson);
    moveCursorToEnd(elVDom.parent.el);
};
// 更新属性
const patchAttrs = (/** @type {any[]} */ oldVdom, /** @type {{ attrs: any; }} */ newVdom) => {
    // @ts-ignore
    let oldAttr = oldVdom.attrs;
    let newAttr = newVdom.attrs;
    let resetUndefined;
    if (!oldAttr && !newAttr) return;

    oldAttr = oldAttr || {};
    newAttr = newAttr || {};

    for (let key in oldAttr) {
        if (newAttr[key] !== resetUndefined && oldAttr[key] != newAttr[key]) {
            oldAttr[key] = newAttr[key];
            // @ts-ignore
            oldVdom.el.setAttribute(key, newAttr[key]);
            delete newAttr[key];
        } else if (oldAttr[key] == newAttr[key]) {
            delete newAttr[key];
            continue;
        } else {
            delete oldAttr[key];
            // @ts-ignore
            oldVdom.el.removeAttribute(key);
        }
    };
    for (let key in newAttr) {
        oldAttr[key] = newAttr[key];
        // @ts-ignore
        oldVdom.el.setAttribute(key, newAttr[key]);
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
    // @ts-ignore
    selection.removeAllRanges();
    // @ts-ignore
    selection.addRange(range);

    // 设置焦点到编辑元素
    // @ts-ignore
    element.focus();
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

    while (str) {
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
            children: [],
            parent: null,
            key: getuuid(24),
            attrs: null,
            selected: null
        };

        if (isEndTag) {
            let popStack = activeObject;
            if (popStack.tag == tagName) {
                activeObject.position.push(runObj.offsetLeft + subStrLen)
                activeObject = activeObject.parent
            } else {
                subStrLen = 0;
                runObj.tagStack.push(popStack);
                console.warn("标签对错误 标签名称：" + popStack.tag + "; 标签位置：" + runObj.offsetLeft);
            }
        } else if (str.startsWith(tagMark)) {

            initObject.tag = tagName;
            initObject.attrs = getAttrs(tagProps, nodeType);

            if (activeObject) {
                let pushObject = Array.isArray(activeObject) ? activeObject : activeObject.children;
                pushObject.push(initObject);
                initObject.parent = activeObject;
                activeObject = activeObject.children[activeObject.children.length - 1];
            } else {
                initObject.parent = null;
                runObj.tagStack.push(initObject);
                activeObject = runObj.tagStack[0];
            }
            let currentElement = createElement(tagName);
            initObject.parent && appendChild(initObject.parent.el, currentElement);
            initObject.el = currentElement;
        } else {
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
            let currentTextNode = createTextNode(textContent);
            initObject.parent && appendChild(initObject.parent.el, currentTextNode);
            initObject.el = currentTextNode
        };
        str = str.substring(subStrLen, strlen);
        runObj.offsetLeft += subStrLen;
    }
    return runObj;
};
/**
* @this {any}
*/
const mountToEl = function (/** @type {string} */ idName) {
    let idElement = document.getElementById(idName);
    this.tagStack[0].children.map((/** @type {{ el: any; }} */ el) => {
        // @ts-ignore
        appendChild(idElement, el.el);
    })
};

// 判断是自闭合标签
/**
 * 
 * @param {string|null} tag 
 * @returns 
 */
const isSelfClosing = (tag) => {
    let status = false;
    switch (tag) {
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
};

/**
 * 
 * @param {*} astDom 
 * @param {*} selectAst
 */
export const getSelectContent = (astDom, selectAst) => {
    /**
     * @type {*}
     */
    let selects = window.getSelection();
    let startTextEl = selects.anchorNode;
    let anchorOffset= selects.anchorOffset;
    let focusOffset= selects.focusOffset;
    let startOffset = anchorOffset;
    let endTextEl = selects.focusNode;
    let endOffset = focusOffset;
    if(startTextEl == endTextEl && anchorOffset == focusOffset) {return []};

    // 选择
    if (startTextEl == astDom.el) { return []; };
    resetSelectPosition(selectAst);

    // @ts-ignore
    let startDeepArr = getDeepArr(astDom.el, startTextEl);
    let endDeepArr = getDeepArr(astDom.el, endTextEl);

    return updateAstSelect(astDom, startDeepArr, startOffset, endDeepArr, endOffset);
    
};

/**
 * 
 * @param {*} astDom 
 * @param {*} startDeepArr 
 * @param {*} startOffset 
 * @param {*} endDeepArr 
 * @param {*} endOffset 
 */
const updateAstSelect = (astDom, startDeepArr, startOffset, endDeepArr, endOffset) => {
    let startElem = getSelectAst(astDom, startDeepArr);
    let endElem = getSelectAst(astDom, endDeepArr);
    let direction = "", selectLeaf = [], position;
    
    /**
     * @type {any}
     */
    let selectAst = [];
    // 移动方向 结束位置大小起始位置 也就是向下选择
    endDeepArr.some((/** @type {number} */ el, /** @type {string | number} */ idx) => {
        if(idx == (endDeepArr.length - 1) && !direction){
            direction = "down";
            return true;
        }else if (el > startDeepArr[idx]) {
            direction = "down";
            return true;
        } else if (el < startDeepArr[idx]) {
            direction = "up";
            return true
        }
    });
    let startAst = getMiddleSelectAst(startDeepArr, startElem, direction, startOffset, "start");
    let endAst = getMiddleSelectAst(endDeepArr, endElem, (direction == "up" ? "down" : "up"), endOffset, "end");

    if (startElem.position[1] == endElem.position[1]) {
        startAst.forEach((el, idx) => {
            if (endAst.indexOf(el) < 0) {
                startAst.splice(idx, 1, null);
            }
        });
        selectAst = startAst.filter(e => e);
    } else {
        selectAst = startAst.concat(endAst);
        let paragraphLists = astDom.children;
        let startIdx = startElem.position[1];
        let endIdx = endElem.position[1];
        if (direction == "down") {
            endIdx = startElem.position[1];
            startIdx = endElem.position[1];
        }
        for (let i = endIdx + 1; i < startIdx; i++) {
            selectAst = selectAst.concat(getChildTreeAst([], paragraphLists[i]));
        }
    };

    return selectAst;
};
/**
 * 
 * @param {*} deepArr 
 * @param {*} childAstVDom 
 * @param {*} direction 
 * @param {*} offset
 * @param {*} position
 */
const getMiddleSelectAst = (deepArr, childAstVDom, direction, offset, position) => {
    let deepArrLen = deepArr.length;
    let deepCopyArr = Array.from(deepArr);
    /**
     * @type {any[]}
     */
    let returnSelectAst = [];
    let idx = deepCopyArr.pop();
    while ((idx || idx === 0) && childAstVDom.parent) {
        let childrens = childAstVDom.parent.children;
        let childLen = childrens.length;
        let deepCopyArrLen = deepCopyArr.length;
        if (deepCopyArrLen == (deepArrLen - 1)) {
            if (childLen > 1) {
                let selectAst;
                returnSelectAst = returnSelectAst.concat(childrens);
                if (direction == "up") {
                    selectAst = returnSelectAst[returnSelectAst.length - 1];
                    selectAst.selected = position == "start" ? [0, offset] : [offset, childAstVDom.children.length];
                } else {
                    selectAst = returnSelectAst[0];
                    selectAst.selected = position == "start" ? [offset, childAstVDom.children.length] : [0, offset];
                }
            } else {
                if (childAstVDom.selected) {
                    let selectedArr = childAstVDom.selected;
                    if(direction == "up"){
                        selectedArr[1] = offset;
                    }else{
                        selectedArr[0] = offset;
                    };
                    selectedArr.sort();
                    if(selectedArr[0] > selectedArr[1]){
                        let origin = selectedArr[1];
                        selectedArr[1] = selectedArr[0];
                        selectedArr[0] = origin;
                    }
                } else {
                    childAstVDom.selected = direction == "up"  ? [0, offset] : [offset, childAstVDom.children.length];
                }
                returnSelectAst.push(childAstVDom.parent);
            };
        } else if (childLen > 1) {
            // 如果索引为0时并且 当前节点的父节点有子节点数量为1为选中当前节点
            // 如果索引不为0且相邻节点数据大于0 此时需要判断是向上选择或都向下选择
            childrens.map && childrens.map((/** @type {any} */ el, /** @type {any} */ idxChild) => {
                if (direction == "up" && idx < idxChild) return;
                if (direction == "down" && idx > idxChild) return;
                if (idxChild != idx) {
                    returnSelectAst = returnSelectAst.concat(getChildTreeAst([], el));
                }
            });
        };
        if (deepCopyArrLen < 2) { break; };
        idx = deepCopyArr.pop();
        childAstVDom = childAstVDom.parent;
    };
    return returnSelectAst;
};

/**
 * 
 * @param {*} collectArr 
 * @param {*} astDom 
 */
const getChildTreeAst = (collectArr, astDom) => {
    if (astDom.tag == 'span') {
        collectArr = collectArr.concat(astDom);
    } else {
        astDom.children && astDom.children.map && astDom.children.map((/** @type {any} */ el, /** @type {any} */ idx) => {
            collectArr = getChildTreeAst(collectArr, el);
        });
    }
    return collectArr;
};

/**
 * 
 * @param {*} astDom 
 * @param {*} deepArr 
 * @returns 
 */
const getSelectAst = (astDom, deepArr) => {
    let copyDeepArr = Array.from(deepArr);
    let startPosition = copyDeepArr.shift();
    let childrens = astDom.children;
    let startElemAst;
    while (startPosition || startPosition === 0) {
        startElemAst = childrens[startPosition];
        childrens = startElemAst.children;
        startPosition = copyDeepArr.shift();
    };
    return startElemAst;
};

/**
 * 
 * @param {*} selectAst 
 */
export const resetSelectPosition = (selectAst) => {
    let select = selectAst.pop();
    while(select) {
        if(select.selected) { 
            select.selected = null
        
        };
        deepClearSelected(select.children);
        select = selectAst.pop();
    };
};

/**
 * 
 * @param {*} childrens 
 */
const deepClearSelected = (childrens) => {
    if(Array.isArray(childrens)){
        childrens.forEach((elem, idx) => {
            if(elem.selected) { elem.selected = null };
            if(elem.children){
                deepClearSelected(elem.children);
            }
        })
    }
};

// 加粗选中文本
/**
 * 
 * @param {*} selectAst 
 */
export const bold = (selectAst) => {
    boldText(selectAst);
};


/**
 * 
 * @param {*} selectAst 
 */
const boldText = (selectAst) => {
    // @ts-ignore
    selectAst.map && selectAst.map((elem) => {
        if (elem.nodeType == "text") {
            if (hasTagName(elem, "strong")) {
                return;
            };
            let strong = createElement("strong");
            let select = elem.selected;
            let textNode = elem.el;
            if (select) {
                if (select[1] != elem.children.length && select[0] == 0) {
                    let splitText = elem.el.splitText(select[1]);
                    createSpanFillText(splitText, "after");
                    textNode = elem.el;
                } else if (select[1] == elem.children.length) {
                    textNode = elem.el.splitText(select[0]);
                    createSpanFillText(elem.el, "insert");
                } else {
                    let splitLast = elem.el.splitText(select[1])
                    createSpanFillText(splitLast, "after");
                    textNode = elem.el.splitText(select[0]);
                    createSpanFillText(elem.el, "insert");
                }
            }
            replaceChild(elem.parent.el, strong, textNode);
            appendChild(strong, textNode);
        } else {
            boldText(elem.children);
        }
    })
};

const inertElement = (/** @type {any} */ parentNode, /** @type {any} */ inertNode) => {
    parentNode.before(inertNode);
};

const afterElement = (/** @type {any} */ parentNode, /** @type {any} */ afterNode) => {
    if(parentNode.nextSibling){
        parentNode.nextSibling.before(afterNode);
    }else{
        parentNode.parentNode.appendChild(afterNode);
    }
};


const createSpanFillText = (/** @type {any} */ fillText, /** @type {any} */ direction) => {
    if(fillText.textContent == "" || fillText.tagName && fillText.tagName.toLocaleLowerCase() == "br") return ;
    let span = createElement("span");
    let parentNode = fillText.parentNode;
    span.appendChild(fillText);
    if(direction == "after"){
        afterElement(parentNode, span);
    }else{
        inertElement(parentNode, span);
    }
};

/**
 * 
 * @param {*} elName 
 * @returns 
 */
const createElement = (elName) => {
    return document.createElement(elName);
};

/**
 * 
 * @param {*} parentNode 
 * @param {*} childNode 
 */
const append = (parentNode, childNode) => {
    parentNode.append(childNode)
};

/**
 * 
 * @param {*} oldElem 
 * @param {*} status 
 */
const cloneNode = (oldElem, status) => {
    if (oldElem.nodeType == "3") {
        return createTextNode(oldElem.nodeValue);
    } else {
        return oldElem.el.cloneNode(status);
    }
};

/**
 * 
 * @param {*} parentNode 
 * @param {*} childNode 
 */
const appendChild = (parentNode, childNode) => {
    return parentNode.appendChild(childNode);
};

/**
 * 
 * @param {*} parentElem 
 * @param {*} newNode 
 * @param {*} oldNode 
 */
const replaceChild = (parentElem, newNode, oldNode) => {
    return parentElem.replaceChild(newNode, oldNode);
};

/**
 * 
 * @param {*} string 
 */
const createTextNode = (string) => {
    return document.createTextNode(string);
};


// 解除加粗选中文本
const unBoldText = () => {

};

/**
 * 
 * @param {*} root 
 * @param {*} findPositionEl 
 * @param {*} deepArr 
 */
const getDeepArr = (root, findPositionEl, deepArr = []) => {
    let childIdx = null;
    let childres = findPositionEl.parentNode.childNodes;
    for (let i = 0; i < childres.length; i++) {
        if (findPositionEl == childres[i]) {
            childIdx = i;
            break;
        }
    };
    
    deepArr.unshift(childIdx);
    if (findPositionEl.parentNode != root) {
        getDeepArr(root, findPositionEl.parentNode, deepArr);
    };
    return deepArr;
};

// 更新 字符串 AST 到 DOM

// 修复替换元素出现的 BUG 调整中

// 粘帖功能调整

// AST 保存在内容中 每次更新ast