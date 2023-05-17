<template>
    <auth-form-wrap :content="{ title: 'Registration', subtitle: 'Welcome!' }">
        <form class="registration-form" @submit.prevent="submitRegister" @input="error = ''">
            <auth-input
                    v-model="form.name.value"
                    type="text"
                    id="name"
                    name="name"
                    class="registration-form__input"
                    label="Name *"
                    placeholder="Name *"
                    :error-list="v$.name.$errors"
            />
            <auth-input
                    v-model="form.email.value"
                    type="email"
                    id="email"
                    name="email"
                    class="registration-form__input"
                    label="Email *"
                    placeholder="Email *"
                    :error-list="v$.email.$errors"

            />
            <auth-input
                    v-model="form.password.value"
                    password
                    id="pass"
                    name="pass"
                    class="registration-form__input"
                    label="Password *"
                    placeholder="Password *"
                    :error-list="v$.password.$errors"
            />
            <auth-input
                    v-model="form.confirmPassword.value"
                    password
                    id="confirmPassword"
                    name="confirmPassword"
                    class="registration-form__input"
                    label="Confirm password *"
                    placeholder="Confirm password *"
                    :error-list="v$.confirmPassword.$errors"
            />
            <base-button type="submit" :loading="loading" class="registration-form__submit"> Register</base-button>
            <p v-if="error" class="registration-form__error-text">
                {{ error }}
            </p>
            <nuxt-link class="registration-form__footer-text" :to="RouteEnum.login.path">
                Already have an account?
                <span>Login</span>
            </nuxt-link>
        </form>
    </auth-form-wrap>
</template>

<script setup>
import {useVuelidate} from '@vuelidate/core';
import {required, email, sameAs} from '@vuelidate/validators';
import {vuelidateConfig} from '@/shared/config/vuelidateConfig/vueliadateConfig';
import {useApi} from "@/composables/useApi";
import {user} from "@/components/entities/user/api/user";
import AuthInput from '../ui/auth/AuthInput';
import AuthFormWrap from '../ui/auth/AuthFormWrap';
import BaseButton from '../ui/base/BaseButton.vue';
import {RouteEnum} from "@/shared/config/routerConfig/routerConfig";
const router = useRouter()
const form = {
    name: ref(''),
    email: ref(''),
    password: ref(''),
    confirmPassword: ref('')
}

const rules = {
    name: {required},
    email: {required, email},
    password: {required},
    confirmPassword: {sameAs: sameAs(form.password)},
}

const v$ = useVuelidate(rules, form, vuelidateConfig)

const {result, callApi: register, loading, error} = useApi(async query => {
    const res = await user.register({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        password_confirmation: form.confirmPassword.value
    })
    return {data: res.data.value?.data, error: res.error.value?.data.message}
})

async function submitRegister() {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
        await register()
        if (result.value) {
            router.push(RouteEnum.login.path)
        }
    }
}

</script>

<style lang="scss" scoped>
.registration-form {
  &__input {
    margin-bottom: 20px;
  }

  &__submit {
    margin-top: 30px;
    width: 100%;
  }

  &__footer-text {
    font-size: 14px;
    color: rgba(var(--textColor), 0.7);
    margin: 15px 0 0;
    text-align: center;
    width: 100%;
    display: inline-block;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }

    span {
      color: rgb(var(--primary));
    }
  }

  &__error-text {
    color: rgb(var(--invalid));
    font-size: 14px;
    margin: 15px 0 0;
  }
}
</style>
