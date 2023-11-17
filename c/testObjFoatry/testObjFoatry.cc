#include <node.h>

namespace test {
    using namespace v8;

    void CreateObject(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        Local<Object> obj = Object::New(isolate);

        obj->Set(context, String::NewFromUtf8(isolate, "msg").ToLocalChecked(), 
        args[0]->ToString(context).ToLocalChecked()).FromJust();

        args.GetReturnValue().Set(obj);
    }

    void init(Local<Object> exports){
        NODE_SET_METHOD(exports, "CreateObject", CreateObject);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);
}