import { generateXHRCancelKey } from "@/utils/utils.js"

const instance = axios.create();
// const CancelToken = axios.CancelToken;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log(config, "config")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const asyncRequest = function () {
    // asyncRequest && asyncRequest.cancel();
    // asyncRequest.cancel = CancelToken.source().cancel;
    console.log(asyncRequest.cancel,"asyncRequest")
    return instance({
        method: "post",
        url: "http://127.0.0.1:300/",
        // cancelToken: source.token,
    });
}

