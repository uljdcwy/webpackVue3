
import { createApp, h} from "vue"
import appContent from "@/app.vue"

const app = createApp(appContent);

document.body.onload = function() {
    let div = document.createElement('div');
    div.id = "app";
    document.body.appendChild(div);
    app.mount(div)
}
