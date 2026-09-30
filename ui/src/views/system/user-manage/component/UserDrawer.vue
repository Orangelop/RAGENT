<template>
  <el-drawer
    v-model="visible"
    size="600"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <h4 class="title-decoration-1 mb-16 mt-8">{{ $t('common.info') }}</h4>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
      @submit.prevent
    >
      <el-form-item
        :prop="isEdit ? '' : 'username'"
        :label="$t('views.login.loginForm.username.label')"
      >
        <el-input
          v-model="userForm.username"
          :placeholder="$t('views.login.loginForm.username.placeholder')"
          maxlength="64"
          show-word-limit
          :disabled="isEdit"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('views.userManage.userForm.nick_name.label')" prop="nick_name">
        <el-input
          v-model="userForm.nick_name"
          :placeholder="$t('views.userManage.userForm.nick_name.placeholder')"
          maxlength="64"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('views.login.loginForm.email.label')" prop="email">
        <el-input
          type="email"
          v-model="userForm.email"
          :placeholder="$t('views.login.loginForm.email.placeholder')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('views.userManage.userForm.phone.label')" prop="phone">
        <el-input
          v-model="userForm.phone"
          :placeholder="$t('views.userManage.userForm.phone.placeholder')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('views.userManage.defaultPassword')" v-if="!isEdit">
        <span>{{ userForm.password }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="display: flex; width: 100%">
        <div style="margin-left: auto">
          <el-button @click.prevent="visible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="submit(userFormRef)" :loading="loading">
            {{ $t('common.save') }}
          </el-button>
        </div>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import userManageApi from '@/api/system/user-manage'
import { MsgSuccess } from '@/utils/message'
import { t } from '@/locales'
import useStore from '@/stores'
import JSEncrypt from 'jsencrypt'

const { user } = useStore()
const props = defineProps({
  title: String,
})

const emit = defineEmits(['refresh'])

const userFormRef = ref()
const userForm = ref<any>({
  username: '',
  email: '',
  password: '',
  phone: '',
  nick_name: '',
})

const rules = reactive({
  username: [
    {
      required: true,
      message: t('views.login.loginForm.username.requiredMessage'),
      trigger: 'blur',
    },
    {
      min: 4,
      max: 64,
      message: t('views.login.loginForm.username.lengthMessage'),
      trigger: 'blur',
    },
  ],
  nick_name: [
    {
      required: true,
      message: t('views.userManage.userForm.nick_name.placeholder'),
      trigger: 'blur',
    },
    {
      min: 1,
      max: 64,
      message: t('views.userManage.userForm.nick_name.lengthMessage'),
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: t('views.login.loginForm.email.requiredMessage'),
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
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: t('views.userManage.userForm.phone.invalidMessage'),
      trigger: 'blur',
    },
  ],
})
const visible = ref<boolean>(false)
const loading = ref(false)
const isEdit = ref(false)

watch(visible, (bool) => {
  if (!bool) {
    userForm.value = {
      username: '',
      email: '',
      password: '',
      phone: '',
      nick_name: '',
    }
    isEdit.value = false
    userFormRef.value?.clearValidate()
  }
})

const open = (data: any) => {
  if (data) {
    userForm.value['id'] = data.id
    userForm.value.username = data.username
    userForm.value.email = data.email
    userForm.value.password = data.password
    userForm.value.phone = data.phone
    userForm.value.nick_name = data.nick_name
    isEdit.value = true
  } else {
    userManageApi.getSystemDefaultPassword().then((res: any) => {
      userForm.value.password = res.data.password
    })
  }

  visible.value = true
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const params = {
        ...userForm.value,
      }
      if (isEdit.value) {
        userManageApi.putUserManage(userForm.value.id, params, loading).then((res) => {
          return user.profile(loading).then(() => {
            emit('refresh')
            MsgSuccess(t('common.editSuccess'))
            visible.value = false
          })
        })
      } else {
        const JSEncryptCtor = (JSEncrypt as any)?.default ? (JSEncrypt as any).default : JSEncrypt
        const js = new (JSEncryptCtor as any)()
        js.setPublicKey(user.rsaKey)
        params.password = js.encrypt(params.password)
        params.encrypted = true
        userManageApi.postUserManage(params, loading).then((res) => {
          return user.profile(loading).then(() => {
            emit('refresh')
            MsgSuccess(t('common.createSuccess'))
            visible.value = false
          })
        })
      }
    }
  })
}

defineExpose({ open })
</script>
