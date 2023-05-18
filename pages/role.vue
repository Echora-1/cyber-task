<template>
  <div class="my-container">
      <p>Roles: {{loading ? 'loading...' : roles}}</p>
  </div>
</template>

<script setup>
import auth from "@/middleware/auth";
import {user } from "@/components/entities/user/api/user";
import {RouteEnum} from "@/shared/config/routerConfig/routerConfig";
useHead({title: RouteEnum.role.meta.title})
definePageMeta({
    layout: "user",
    middleware: [ auth ],
});
const cookieToken = useCookie('token')
const roles = computed(() =>  userInfo.value?.roles.map(r => r.name).join(''));

const {result: userInfo, callApi: getUserInfo, loading } = useApi(async query => {
    const res = await user.info(cookieToken.value)
    return {data: res.data.value?.data, error: res.error.value?.data.message}
})

onMounted(() => {
    nextTick(async () => {
        await getUserInfo()
    })
})
</script>