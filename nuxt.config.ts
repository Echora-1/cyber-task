// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
    ],
    css: ['@/assets/styles/main.scss'],
    nitro: {
        devProxy: {
            '/api/': {
                target: 'https://dev.api.cars.md/Api/',
                pathRewrite: { "^/api/": "" },
                changeOrigin: true
            }
        }
    }
})
