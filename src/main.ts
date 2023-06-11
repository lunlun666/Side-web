import { createApp } from 'vue'
import './style.css'
import App from './App.tsx'
import { createPinia } from 'pinia'

// Import vue-router
import router from './router/index.ts'

// Import Quasar
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const myApp = createApp(App)
const pinia = createPinia()

myApp.use(Quasar, {
    plugins: {}
})
.use(router)
.use(pinia)
// myApp.use(router)
// myApp.use(pinia)

myApp.mount('#app')