import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// global style
import './styles/global.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

loadFonts()

createApp(App).use(vuetify).use(pinia).mount('#app')
