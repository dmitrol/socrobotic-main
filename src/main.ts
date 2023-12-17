import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import './assets/styles/main.scss'

import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
// import { i18n } from './lang/i18n'
import i18n from '@/lang/i18n'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URI

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

const pinia = createPinia()
const app = createApp(App)

app.use(router)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(PrimeVue)
app.use(i18n)

app.mount('#app')