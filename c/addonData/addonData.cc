#include <node.h>

using namespace v8;

class AddonData{
public:
    explicit AddonData(Isolate* isolate):
        call_count(0) {
            node::AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
        }
        int call_count;
        static void DeleteInstance(void *data) {
            delete static_cast<AddonData*>(data);
        }

};
static void testFn(const FunctionCallbackInfo<Value>& info) {
    AddonData *data = reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());
    data->call_count++;
    info.GetReturnValue().Set((double)data->call_count);
}

NODE_MODULE_INIT() {
    Isolate *isolate = context->GetIsolate();

    AddonData* data = new AddonData(isolate);

    Local<External> external = External::New(isolate, data);

    exports->Set(context, String::NewFromUtf8(isolate, "testFn").ToLocalChecked(),
                 FunctionTemplate::New(isolate, testFn, external)->GetFunction(context).ToLocalChecked())
        .FromJust();
}