import {createApp} from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'vant/lib/index.css';
import Vant from 'vant'
import {Lazyload} from 'vant';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)

app.use(router)

app.use(Vant)

app.use(ElementPlus)


// register all icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')