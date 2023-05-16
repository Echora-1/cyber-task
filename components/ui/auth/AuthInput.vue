<template>
  <div
    :class="[
      'input',
      { 'input--focused': focused, 'input--invalid': invalid },
    ]"
  >
    <label
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <div class="input__wrapper">
      <input
        v-if="!password"
        :id="id"
        class="input__input"
        v-bind="$attrs"
        :value="modelValue"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
      />
      <input
        v-else
        :id="id"
        class="input__input"
        :type="passwordType"
        v-bind="$attrs"
        :value="modelValue"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
      />
      <div v-if="password" class="input__toggle-type" @click.prevent="switchPassword">
        <icon-show v-show="passwordType === 'text'" />
        <icon-hiden v-show="passwordType === 'password'" />
      </div>
    </div>
    <p v-if="invalid" class="input__invalid-text">{{ errorMessages[0] }}</p>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'
import IconShow from './icon/IconShow'
import IconHiden from './icon/IconHiden'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  valid: {
    type: Boolean,
    default: true,
  },

  errorList: {
    type: Array,
    default: () => [],
  },

  password: {
    type: Boolean,
    default: false,
  },
})

const focused = ref(false)
const touched = ref(false)
const passwordType = ref('password')

const emit = defineEmits(['update:modelValue'])

const invalid = computed(() => {
  return props.errorList.length > 0 && touched.value
})

const errorMessages = computed(() => {
  return props.errorList.map((item) => {
    return item.$message
  })
})

function inputHandler(event) {
  emit('update:modelValue', event.target.value)
}

function focusHandler() {
  focused.value = true
}

function blurHandler() {
  touched.value = true
  focused.value = false
}

function switchPassword() {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;

  &__wrapper {
    border-bottom: 1px solid rgba(var(--textColor), 0.1);
    width: 100%;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;
    background: transparent;
  }

  &__input {
    width: 100%;
    margin: 0;
    border: none;
    outline: none;
    padding: 13px 34px 13px 0;
    background: transparent;
    font-size: 16px;
    line-height: 22px;
    color: rgb(var(--textColor));
    position: relative;
    transition: color 0.3s;

    &::placeholder {
      color: rgba(var(--textColor), 0.7);
    }
  }

  &__toggle-type {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgba(var(--textColor), 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
  }

  &__label {
    font-weight: 300;
    font-size: 14px;
    color: rgba(var(--textColor), 0.7);
  }

  &--focused {
    .input__wrapper {
      border-color: rgb(var(--primary));
    }

    .input__input {
      -webkit-text-fill-color: rgb(var(--textColor)) !important;
    }

    .input__label {
      color: rgb(var(--textColor));
    }
  }

  &--invalid {
    .input__wrapper {
      border-color: rgb(var(--invalid));
    }

    .input__label {
      color: rgb(var(--invalid));
    }
  }

  &__invalid-text {
    color: rgb(var(--invalid));
    font-size: 13px;
    line-height: 19px;
    margin: 2px 0;
  }
}
</style>
