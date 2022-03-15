import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

// global style
import './styles/global.scss'

loadFonts()

createApp(App).use(vuetify).use(createPinia()).mount('#app')
