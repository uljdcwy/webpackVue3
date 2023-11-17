#include <node.h>

namespace test {
    using namespace v8;

    void testFn(const FunctionCallbackInfo<Value>& args){
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "zhengxiya").ToLocalChecked());
    }

    void init(Local<Object> exports){
        NODE_SET_METHOD(exports, "testFn", testFn);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}