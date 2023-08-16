import { createApp } from 'vue'

import store from '@/store'
import router from '@/router'
import { loadPlugins } from '@/plugins'

// import './style.css'
import 'element-plus/dist/index.css'

import '@/styles/index.scss'

import App from './App.vue'

const app = createApp(App)

loadPlugins(app)

app.use(store).use(router)

app.mount('#app')
