import { createApp } from "vue";
import router from './router'
import { vuetify } from './plugins/vuetify'
import App from "./App.vue";

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount("#app");
