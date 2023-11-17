#include <node.h>

namespace test {
    using namespace v8;

    void callback(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        Local<Function> fn = Local<Function>::Cast(args[0]);
        
        const unsigned argc = 1;

        Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "zhengxiya").ToLocalChecked() };

        fn->Call(context, Null(isolate), argc, argv).ToLocalChecked();
    }

    void init(Local<Object> exports, Local<Object> module){
        NODE_SET_METHOD(module, "exports", callback);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init);

}