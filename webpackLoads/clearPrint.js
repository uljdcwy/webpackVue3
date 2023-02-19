module.exports = function(source){
    source = source.replace(/console.log\([^)]+[\)];?/,'')
    console.log(source,"source")
    return source;
}