export const generateXHRCancelKey = function(){
    let random = (1000000 * Math.random());
    return parseInt(random);
}