<template>
    <div class="login my-container">
        <process-login/>
    </div>
</template>

<script setup>
import ProcessLogin from "../components/processes/ProcessLogin";
import {RouteEnum} from "@/shared/config/routerConfig/routerConfig";
useHead({title: RouteEnum.login.meta.title})
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
