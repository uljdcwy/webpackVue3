#include <node.h>
#include <assert.h>
#include <stdlib.h>
#include <iostream>

using namespace v8;
using namespace node;
using namespace std;

static char cookie[] = "test cookie";
static int cleanup_cb1_int = 0;
static int cleanup_cb2_int = 0;

static void cleanup_cb1(void* arg){
    Isolate* isolate = static_cast<Isolate*>(arg);

    HandleScope scope(isolate);
    Local<Object> obj = Object::New(isolate);
    assert(!obj.IsEmpty());
    assert(obj->IsObject());
    cleanup_cb1_int++;
    cout << "cleanup_cb1_int" << cleanup_cb1_int << endl;
}

static void cleanup_cb2(void* arg) {
    assert(arg == static_cast<void*>(cookie));
    cleanup_cb2_int++;
    cout << "cleanup_cb2_int" << cleanup_cb2_int << endl;
}

static void sanCheck(void*){
    assert(cleanup_cb1_int == 1);
    assert(cleanup_cb2_int == 1);
    cout << "sancheck" << endl;
}

NODE_MODULE_INIT(){
    Isolate* isolate = context->GetIsolate();

    AddEnvironmentCleanupHook(isolate, sanCheck, nullptr);
    AddEnvironmentCleanupHook(isolate, cleanup_cb2, cookie);
    AddEnvironmentCleanupHook(isolate, cleanup_cb1, isolate);
}