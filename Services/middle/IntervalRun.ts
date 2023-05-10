export const InterRun = (runFn: Function, time: number = 0) => {
    if(!time) return ;
    runFn && runFn();
    // 延时执行
    setTimeout(InterRun,time, runFn, time)
}