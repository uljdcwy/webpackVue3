#include <node.h>

namespace test {

    using namespace v8;

    void Constructor(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        Local<String> propsStr = String::NewFromUtf8(isolate, "msg").ToLocalChecked();

        Local<Number> num = Number::New(isolate, 123456);

        args.This()->Set(propsStr, num);

        return args.GetReturnValue().Set(args.This());
    }


    void ClassGet(const FunctionCallbackInfo<Value>& args) {

        Isolate* isolate = args.GetIsolate();

        return args.GetReturnValue().Set(args.This()->Get(String::NewFromUtf8(isolate, "msg")));
    
    }

    void Init(Local<Object> exports) {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);

        Local<Context> context = isolate->GetCurrentContext();

        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, Constructor);

        tpl->SetClassName(String::NewFromUtf8(isolate, "TestClass").ToLocalChecked());

        Local<ObjectTemplate> proto = tpl->PrototypeTemplate();

        proto->Set(String::NewFromUtf8(isolate, "get"), FunctionTemplate::New(isolate, ClassGet));
 
        exports->Set(String::NewFromUtf8(isolate, "TestClass"), tpl->GetFunction(context));

    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
}