import axios from "axios";

export const instance = axios.create();

instance.interceptors.request.use(function (/** @type {any} */ config) {
    console.log(config, "config")
    return config;
}, function (/** @type {any} */ error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (/** @type {any} */ response) {
    return response;
}, function (/** @type {any} */ error) {
    return Promise.reject(error);
});

export const asyncRequest = function () {
    return instance({
        method: "post",
        url: "",
    });
}

