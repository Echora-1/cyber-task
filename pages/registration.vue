<template>
    <div class="registration my-container">
        <process-registration/>
    </div>
</template>

<script setup>
import ProcessRegistration from "@/components/processes/ProcessRegistration.vue";
import {RouteEnum} from "@/shared/config/routerConfig/routerConfig";
useHead({title: RouteEnum.registration.meta.title})
</script>

<style lang="scss" scoped>
.registration {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
