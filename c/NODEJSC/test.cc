#include <node.h>

namespace test {

    using namespace v8;

    void run(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        Local<Script> script = Script::Compile(context, String::NewFromUtf8(isolate , "let name = '123456'; console.log('12345679')").ToLocalChecked()).ToLocalChecked();
        Local<Value> res = script->Run(context).ToLocalChecked();
        args.GetReturnValue().Set((double) 132);
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "testFn", run);
    }

    NODE_MODULE(NODE_SET_MODULE_NAME, init)

}