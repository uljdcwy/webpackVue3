import { GET } from "@/http/index.js"


/**
 * 
 * @param {*} routeName 
 * @returns { Promise<any> }
 */
export const getData = (routeName) => {
    return GET(getUrl(routeName), '');
}

/**
 * 
 * @param {string} routeName 
 * @returns 
 */
export const getUrl = (routeName) => {
    let url = "";
    routeName = routeName.split('?')[0];
    switch(routeName) {
        case "/":
        case "index":
            url = "/adminIndex/getData";
            break;
    };
    console.log(url,"url")
    return url;
}

/**
 * 
 * @param {string} routeUrl 
 * @returns 
 */
export const getPageI18nName = (routeUrl) => {
    let url = "";
    routeUrl = routeUrl.split('?')[0];
    switch(routeUrl) {
        case "/":
        case "index":
            url = "vueIndex";
            break;
    };
    return url;
}