#include <node_api.h>

namespace testNApi {
    napi_value testFn(napi_env env,napi_callback_info args) {
        napi_value greeting;
        napi_status status;
        status = napi_create_string_utf8(env, "zhengxiya", NAPI_AUTO_LENGTH,&greeting);
        if(status != napi_ok) return nullptr;
        return greeting;
    }

    napi_value init(napi_env env, napi_value exports) {
        napi_status status;
        napi_value fn;
        status = napi_create_function(env,nullptr,0,testFn, nullptr, &fn);
        if(status != napi_ok) return nullptr;
        status = napi_set_named_property(env,exports, "testFn",fn);
        if(status != napi_ok) return nullptr;
        return exports;
    }
    NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
}