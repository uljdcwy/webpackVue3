import { generateXHRCancelKey } from "@/utils/utils.js"

const instance = axios.create();

instance.interceptors.request.use(function (config) {
    console.log(config, "config")
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const asyncRequest = function () {
    console.log(asyncRequest.cancel,"asyncRequest")
    return instance({
        method: "post",
        url: "",
    });
}

