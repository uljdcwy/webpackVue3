#include <node.h>

namespace testCallback {
    using namespace v8;
    void testCallback(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        Local<Function> cb = Local<Function>::Cast(args[0]);
        const unsigned argc = 1;
        Local<Value> argv[argc] = {String::NewFromUtf8(isolate, "zhengxiya").ToLocalChecked()};
        cb->Call(context, Null(isolate), argc, argv).ToLocalChecked();
    }

    void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", testCallback);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}