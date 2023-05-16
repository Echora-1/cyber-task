import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['token'])
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    if (!cookies.get('token')) {
      return navigateTo('/')
    }
  }
})
