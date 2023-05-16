<template>
  <header class="user-header">
      <BaseButton @click="logout">
          Logout
      </BaseButton>
  </header>
</template>
<script setup>
import BaseButton from "~/components/ui/base/BaseButton.vue";
import {useUserStore} from "~/store/user";
import {useCookies} from "@vueuse/integrations/useCookies";
const router = useRouter()
const userStore = useUserStore()
const cookies = useCookies(['token'])

function logout() {
    router.push('/')
    userStore.setUser(null)
    cookies.remove('token')
}
</script>

<style lang="scss" scoped>
.user-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  border-bottom: 1px solid gray;
}
</style>