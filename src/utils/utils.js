export const generateXHRCancelKey = function(){
    let random = (1000000 * Math.random()).toString();
    return parseInt(random);
}