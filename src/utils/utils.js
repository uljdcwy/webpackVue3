export const generateXHRCancelKey = function(){
    let random = (1000000 * Math.random()).toString();
    return parseInt(random);
}

export const isClient = () => {
    // @ts-ignore
    return Boolean(global.navigation);
}