<template>
    <div class="form-wrap">
        <div class="form-wrap__header">
            <h2 class="form-wrap__title">{{ content?.title }}</h2>
            <p class="form-wrap__subtitle">{{ content?.subtitle }}</p>
        </div>
        <div class="form-wrap__main">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    content: Object
})

</script>

<style lang="scss" scoped>
.form-wrap {
  background: rgb(237 236 236);
  border-radius: 16px;
  min-width: 440px;

  &__header {
    padding: 15px 20px;
    border-bottom: 2px solid rgba(var(--textColor), 0.1);
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-weight: 500;
    font-size: 28px;
    text-align: center;
    margin: 0 0 10px;
  }

  &__subtitle {
    opacity: 0.35;
    margin: 0;
    text-align: center;
  }

  &__main {
    padding: 0 30px 30px;
  }
}
</style>
