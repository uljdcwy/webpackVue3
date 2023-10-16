#include <node.h>
using namespace v8;
namespace testReturn {
    void testReturn(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "test value").ToLocalChecked());
    }
    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "testFn", testReturn);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}