<template>
    <auth-form-wrap :content="{ title: 'Login', subtitle: 'Welcome back!' }">
        <form class="login-form" @submit.prevent="login" @input="error = false">
            <auth-input
                    v-model="form.email"
                    type="email"
                    id="email"
                    name="email"
                    class="login-form__input"
                    label="Email *"
                    placeholder="Email *"
                    :error-list="v$.email.$errors"

            />
            <auth-input
                    v-model="form.password"
                    password
                    id="pass"
                    name="pass"
                    class="login-form__input"
                    label="Password *"
                    placeholder="Password *"
                    :error-list="v$.password.$errors"
            />
            <base-button type="submit" :loading="loading" class="login-form__submit">
                Login
            </base-button>
            <p v-if="error" class="login-form__error-text">
                {{ error }}
            </p>
            <nuxt-link class="login-form__footer-text" to="/registration">
                Not with us yet?
                <span>Registration</span>
            </nuxt-link>
        </form>
    </auth-form-wrap>
</template>

<script setup>
import {reactive} from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import {useVuelidate} from '@vuelidate/core';
import {required, email} from '@vuelidate/validators';
import {vuelidateConfig} from '@/shared/config/vuelidateConfig/vueliadateConfig';
import {useApi} from "@/composables/useApi";
import AuthInput from '../ui/auth/AuthInput';
import AuthFormWrap from '../ui/auth/AuthFormWrap';
import BaseButton from '../ui/base/BaseButton.vue';
import {user} from "@/components/entities/user/api/user";
const router = useRouter()
const cookies = useCookies(['token'])

const form = reactive({
    email: '',
    password: '',
})

const rules = {
    email: {required, email},
    password: {required},
}

const v$ = useVuelidate(rules, form, vuelidateConfig)

const {result: userToken, callApi: userLogin, loading, error} = useApi(async query => {
    const res = await user.login({
        email: form.email,
        password: form.password,
    })
    return res.data.data
})

async function login() {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
        await userLogin()
        if (userToken.value) {
            cookies.set('token', userToken.value.token)
            router.push('/role')
        }
    }


}

</script>

<style lang="scss" scoped>
.login-form {
  &__input:first-child {
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
