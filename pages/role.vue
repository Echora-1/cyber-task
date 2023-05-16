<template>
  <div class="my-container">
      <p>Roles: {{loading ? 'loading...' : roles}}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {useUserStore} from "@/store/user";
import auth from "@/middleware/auth";
import {useApi} from "@/composables/useApi";
import {user} from "@/components/entities/user/api/user";
import {useCookies} from "@vueuse/integrations/useCookies";

definePageMeta({
    layout: "user",
    middleware: [ auth ],
});

const cookies = useCookies(['token'])
const userStore = useUserStore()
const roles = computed(() =>  userStore.user?.roles.map(r => r.name).join(''));

const {result: userData, callApi: getUserFromServer, loading, error} = useApi(async query => {
    const res = await user.info(cookies.get('token'))
    return res.data.data
})

async function getUser() {
    await getUserFromServer()
    if(userData.value) {
        userStore.setUser(userData.value)
    }
}
getUser()
</script>