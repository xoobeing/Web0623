// vite.config.js
console.log('Vite config loaded!') // <- 디버깅용
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chatbot: resolve(__dirname, 'basicChatbot.html'),

      },
    },
  },
})
