<template>
  <login-layout v-if="!loading" v-loading="loading">
    <LoginContainer :subTitle="newDefaultSlogan">
      <h2 class="mb-24 text-center">{{ $t('views.login.title') }}</h2>
      <div>
        <el-form
          class="login-form"
          :rules="rules"
          :model="loginForm"
          ref="loginFormRef"
          @keyup.enter="loginHandle"
        >
          <div class="mb-24">
            <el-form-item prop="username">
              <el-input
                size="large"
                class="input-item"
                prefix-icon="User"
                v-model="loginForm.username"
                @blur="handleUsernameBlur(loginForm.username)"
                :placeholder="$t('views.login.loginForm.username.placeholder')"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="mb-24">
            <el-form-item prop="password">
              <el-input
                type="password"
                size="large"
                class="input-item"
                prefix-icon="Lock"
                v-model="loginForm.password"
                :placeholder="$t('views.login.loginForm.password.placeholder')"
                show-password
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="mb-24" v-if="identifyCode">
            <el-form-item prop="captcha">
              <div class="flex-between w-full">
                <el-input
                  size="large"
                  class="input-item"
                  v-model="loginForm.captcha"
                  :placeholder="$t('views.login.loginForm.captcha.placeholder')"
                >
                </el-input>

                <img
                  :src="identifyCode"
                  alt=""
                  height="38"
                  class="ml-8 cursor border border-r-6"
                  @click="makeCode(loginForm.username)"
                />
              </div>
            </el-form-item>
          </div>
        </el-form>

        <el-button
          size="large"
          type="primary"
          class="w-full"
          @click="loginHandle"
          :loading="loading"
        >
          {{ $t('views.login.buttons.login') }}
        </el-button>
        <div class="operate-container flex-center mt-12">
          <el-button
            :loading="loading"
            class="forgot-password"
            @click="router.push('/forgot_password')"
            link
            type="primary"
          >
            {{ $t('views.login.forgotPassword') }}
          </el-button>
        </div>
      </div>
    </LoginContainer>
  </login-layout>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginRequest } from '@/api/type/login'
import LoginContainer from '@/layout/login-layout/LoginContainer.vue'
import LoginLayout from '@/layout/login-layout/LoginLayout.vue'
import loginApi from '@/api/user/login'
import { getBrowserLang, t } from '@/locales'
import useStore from '@/stores'
import { useI18n } from 'vue-i18n'
import JSEncrypt from 'jsencrypt'

const router = useRouter()
const { login, user } = useStore()
const { locale } = useI18n({ useScope: 'global' })
const loading = ref<boolean>(false)
const identifyCode = ref<string>('')
const loginFormRef = ref<FormInstance>()
const loginForm = ref<LoginRequest>({
  username: '',
  password: '',
  captcha: '',
})

const rules = ref<FormRules<LoginRequest>>({
  username: [
    {
      required: true,
      message: t('views.login.loginForm.username.requiredMessage'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('views.login.loginForm.password.requiredMessage'),
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: false,
      message: t('views.login.loginForm.captcha.requiredMessage'),
      trigger: 'blur',
    },
  ],
})

const loginHandle = () => {
  if (!loginFormRef.value) {
    return
  }
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // JSEncrypt 在有些打包环境可能作为 default export 或直接导出，兼容两种情况
      const JSEncryptCtor = (JSEncrypt as any)?.default ? (JSEncrypt as any).default : JSEncrypt
      const js = new (JSEncryptCtor as any)()
      js.setPublicKey(user.rsaKey)
      const jsonData = JSON.stringify(loginForm.value)
      const encryptedBase64 = js.encrypt(jsonData)

      login
        .asyncLogin({ encryptedData: encryptedBase64, username: loginForm.value.username })
        .then(() => {
          locale.value = localStorage.getItem('Ragent-locale') || getBrowserLang() || 'en-US'
          localStorage.setItem('workspace_id', 'default')
          router.push({ name: 'home' })
        })
        .catch(() => {
          const username = loginForm.value.username
          loading.value = false
          makeCode(username)
        })
    }
  })
}

function makeCode(username?: string) {
  loginApi
    .getCaptcha(username)
    .then((res: any) => {
      if (res && res.data && res.data.captcha) {
        identifyCode.value = res.data.captcha
      }
    })
    .catch((error) => {
      console.error('Failed to get captcha:', error)
    })
}

function handleUsernameBlur(username: string) {
  makeCode(username)
}

onBeforeMount(() => {
  loading.value = true
  user.asyncGetProfile().then(() => {
    loading.value = false
  })
})

const newDefaultSlogan = computed(() => {
  return t('views.login.defaultSlogan')
})
</script>
<style lang="scss" scoped></style>
