import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    rollupOptions: {
      plugins: [
        obfuscator({
          transformObjectKeys: true,
          unicodeEscapeSequence: true,
          numbersToExpressions: true,
          shuffleStringArray: true,
          splitStrings: true,
          stringArrayThreshold: 1,
          identifierNamesGenerator: 'hexadecimal'
        })
      ]
    }
  }
})
