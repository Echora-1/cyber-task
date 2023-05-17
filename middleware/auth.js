export default defineNuxtRouteMiddleware((to, from) => {
    const cookieToken = useCookie('token')
    if (!cookieToken.value) {
        return navigateTo('/')
    }
})
