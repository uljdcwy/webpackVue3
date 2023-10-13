export const disabledDragPage = (el) => {
    document.addEventListener('touchmove', diabledDrag, { passive: false });
    const enbleDrop = (el) => {
        let prevY = 0;
        let hasListener = true;
        el.addEventListener("touchmove", (e) => {
            const currentY = e.touches[0].pageY;
            let top = el.parentNode.scrollTop;
            let clientHeight = document.body.clientHeight;
            let height = el.parentNode.scrollHeight;
            let bottom = height - top - clientHeight;

            let bottomToTop = prevY > currentY;
            let isMin = top <= 0;
            let isMax = bottom <= 0;
            let topToBottom = prevY < currentY;
            if (isMin && bottomToTop || isMax && topToBottom) {
                e.preventDefault();
            } else if (hasListener) {
                hasListener = false;
                document.removeEventListener('touchmove', diabledDrag);
            }
            prevY = currentY
        })
        el.addEventListener("touchend", (e) => {
            hasListener = true;
            document.addEventListener('touchmove', diabledDrag, { passive: false });
        })
    };
    if (Array.isArray(el)) {
        el.map(enbleDrop)
    } else {
        enbleDrop(el)
    }
};
export const diabledDrag = (e) => {
    e.preventDefault();
}