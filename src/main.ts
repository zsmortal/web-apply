import { createApp, App as AppInstance } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerStore } from './store'
import directives from './utils/directive'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app: AppInstance = createApp(App)
app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))
registerStore()
app.use(directives)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
