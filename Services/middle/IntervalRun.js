export const InterRun = (runFn, time = 0) => {
    if(!time) return ;
    runFn && runFn();
    setTimeout(InterRun,time, runFn, time)
}