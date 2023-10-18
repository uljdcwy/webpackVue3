#include <node.h>

namespace testV8Params {
    using namespace v8;
    void Add(const FunctionCallbackInfo<Value> &args) {
        Isolate *isolate = args.GetIsolate();

        if (args.Length() < 2) {
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "length err").ToLocalChecked()));
            return;
        }

        if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
            isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "error type").ToLocalChecked()));
            return;
        }

        double value = args[0].As<Number>()->Value() + args[1].As<Number>()->Value();

        Local<Number> num = Number::New(isolate, value);

        args.GetReturnValue().Set(num);
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "testFn", Add);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}