#include <node.h>
namespace testFnFoatry {
    using namespace v8;
    void testFn(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "zhengxiya").ToLocalChecked());
    }

    void CreateFunction(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, testFn);
        Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();

        fn->SetName(String::NewFromUtf8(isolate, "testFn").ToLocalChecked());

        args.GetReturnValue().Set(fn);
    }

    void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", CreateFunction);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}