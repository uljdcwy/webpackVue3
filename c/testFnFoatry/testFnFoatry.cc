#include <node.h>

namespace test {
    using namespace v8;

    void CFunction(const FunctionCallbackInfo<Value>& args){
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "zheng").ToLocalChecked());
    }

    void CreateFunction(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        Local<Context> context = isolate->GetCurrentContext();
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, CFunction);
        Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();

        fn->SetName(String::NewFromUtf8(isolate, "CFunction").ToLocalChecked());

        args.GetReturnValue().Set(fn);
    }

    void Init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", CreateFunction);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
}