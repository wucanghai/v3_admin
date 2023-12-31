import { createApp } from 'vue'
import store from '@/store'
import router from '@/router'

import '@/router/permission'

import { loadPlugins } from '@/plugins'
import { loadSvg } from '@/icons'

// import './style.css'
import 'element-plus/dist/index.css'

import '@/styles/index.scss'

import App from './App.vue'

const app = createApp(App)

loadPlugins(app)

loadSvg(app)

app.use(store).use(router)

app.mount('#app')
