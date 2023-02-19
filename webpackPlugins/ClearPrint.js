class ClearPrint {
    constructor(doneCallback, failCallback){
        this.doneCallback = doneCallback;
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('ClearPrint',(compilation,callback)=>{
            for(let key in compilation.assets){
                let str = compilation.assets[key]._value;
                compilation.assets[key]._value = str.replace(/console.log\([^)]+[\)];?/,'');
            }
            callback();
            this.doneCallback && this.doneCallback(chunk)
        })
    }
}

module.exports = ClearPrint;