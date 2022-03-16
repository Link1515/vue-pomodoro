import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerSW } from 'virtual:pwa-register'

// global style
import './styles/global.scss'

registerSW({
  onNeedRefresh () {},
  onOfflineReady () {}
})()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

loadFonts()

createApp(App).use(vuetify).use(pinia).mount('#app')
