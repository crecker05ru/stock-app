import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'vue-macros/vite'
import Inspect from 'vite-plugin-inspect'
// import eslintPlugin from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: { __APP_ENV__: JSON.stringify(env.APP_ENV) },
    base: process.env.APP_BASE,
    assetsInclude: ['**/'],
    plugins: [
      // vue(),
      // vueJsx(),
      vueDevTools(),
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),

      Inspect(),
      // eslintPlugin(),
      //   {
      //   fix: true,
      //   overrideConfig: {
      //     rules: {
      //       '@typescript-eslint/no-unused-vars': 'off',
      //     },
      //   },
      // }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/mixins.scss" as *;
          `,
        },
        sass: {
          quietDeps: true,
        },
      },
    },
    build: {
      outDir: mode === 'production' ? 'dist' : mode === 'demo' ? 'dist' : 'dist',
      chunkSizeWarningLimit: 2500,
      // rollupOptions: {
      //   output: {
      //   }
      // }
    },
  }
})
