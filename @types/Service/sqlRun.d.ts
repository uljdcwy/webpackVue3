
type koaCtx = any;

// 调用SQL时的接口
declare interface sqlRun {
     (ctx: koaCtx): Promise<any>;
}

// forEach接口;
interface forEachFn {
     (el: any, index: number): void;
}

// 不使用SQL写入文件存数据的方法
interface writeFile {
     (ctx: koaCtx): void;
}

interface middle {
     (ctx: koaCtx, next?: Function): Promise<any>
}