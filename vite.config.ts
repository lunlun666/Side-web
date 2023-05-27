import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueJsx(),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": resolve (__dirname, "src"),
    }
  }
})
