<template>
  <header class="user-header">
      <BaseButton @click="logout">
          Logout
      </BaseButton>
  </header>
</template>
<script setup>
import BaseButton from "~/components/ui/base/BaseButton.vue";
const router = useRouter()
const cookieToken = useCookie('token')

function logout() {
    router.push('/')
    cookieToken.value = null
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