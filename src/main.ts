import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import { Button } from 'vant'

const app = createApp(App)
app.use(Button)
app.use(createPinia())
app.use(router)

app.mount('#app')
