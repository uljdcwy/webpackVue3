#include <node.h>

namespace test {
    using namespace v8;
    using namespace node;
    class TestS{
        public:
            explicit TestS(Isolate* isolate):
                count(0){
                    AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
                }
                int count;

                static void DeleteInstance(void* data){
                    delete static_cast<TestS*>(data);
                }
    };

    static void one(const FunctionCallbackInfo<Value>& args){
        Isolate* isolate = args.GetIsolate();
        TestS* obj = reinterpret_cast<TestS*>(args.Data().As<External>()->Value());
        obj->count++;
        args.GetReturnValue().Set((double)obj->count);
    }

    NODE_MODULE_INIT() {
        Isolate* isolate = context->GetIsolate();

        TestS* data = new TestS(isolate);

        Local<External> external = External::New(isolate, data);

        exports->Set(context, String::NewFromUtf8(isolate, "method").ToLocalChecked(), FunctionTemplate::New(isolate, one, external)->GetFunction(context).ToLocalChecked()).FromJust();
    }
}