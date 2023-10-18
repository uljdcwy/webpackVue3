#include <node.h>

namespace testFoatry {
    using namespace v8;

    void TestFoatry(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> obj = Object::New(isolate);
        obj->Set(context, String::NewFromUtf8(isolate, "zhengxiya").ToLocalChecked(), args[0]->ToString(context).ToLocalChecked()).FromJust();
        args.GetReturnValue().Set(obj);
    }

    void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", TestFoatry);
    }
    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
} // namespace testFoatry
