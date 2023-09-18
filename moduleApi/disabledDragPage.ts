/**
 * 
 * @param el 当页禁止拖动时可以定义多个元素可拖动与单个元素可拖动
 */
export const disabledDragPage = (el: HTMLElement | HTMLElement[]) => {

    // 禁止拖动
    document.addEventListener('touchmove', diabledDrag, { passive: false });

    const enbleDrop = (el) => {
        let prevY = 0;
        let hasListener = true;
        // 拖动开始移除全局的禁拖动
        el.addEventListener("touchmove", (e) => {
            // 当前Y的位置
            const currentY = e.touches[0].pageY;
            // 当前滚动条的Top
            let top = el.parentNode.scrollTop;
            // 视窗高度
            let clientHeight = document.body.clientHeight;
            // 可滚动条高度
            let height = el.parentNode.scrollHeight;
            // 距离底部的位置
            let bottom = height - top - clientHeight;

            let bottomToTop = prevY > currentY;
            let isMin = top <= 0;
            let isMax = bottom <= 0;
            let topToBottom = prevY < currentY;
            // console.log(hasListener, bottomToTop, "bottomToTop", "isMin", isMin, topToBottom, "topToBottom", "isMax", isMax)
            // 如果滚动条在顶部 scrollTop == 0，与 是向下拉 前一位Y位置大于当胆的Y位置 或者在底部 距离底部小于等于0 与是上拉 前一个Y小于当前的Y
            if (isMin && bottomToTop || isMax && topToBottom) {
                // 禁事默认事件
                e.preventDefault();
                // 如果有拖动禁止 则移除拖动禁止
            } else if (hasListener) {
                hasListener = false;
                // 取消禁止拖动
                document.removeEventListener('touchmove', diabledDrag);
            }
            // 记录当前Y位置
            prevY = currentY
        })
        // 拖动结束监听全局的禁拖动
        el.addEventListener("touchend", (e) => {
            hasListener = true;
            // 禁止拖动
            document.addEventListener('touchmove', diabledDrag, { passive: false });
        })
    };
    // 如果是数组循环
    if (Array.isArray(el)) {
        el.map(enbleDrop)
    } else {
        enbleDrop(el)
    }
};
// 禁子拖动指针函数
export const diabledDrag = (e) => {
    e.preventDefault();
}