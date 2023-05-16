<template>
    <user-header />
    <main>
        <slot />
    </main>
</template>
<script setup>
import UserHeader from "~/components/entities/user/ui/UserHeader.vue";
</script>