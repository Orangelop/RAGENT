<template>
  <div class="flex-center">
    <el-icon :size="24" class="color-secondary">
      <UserFilled />
    </el-icon>
    <span
      class="ml-8 color-text-primary ellipsis"
      style="max-width: 160px"
      :title="user.userInfo?.nick_name"
    >
      {{ user.userInfo?.nick_name }}
    </span>
    <TagGroup v-if="role_list.length > 0" class="ml-8" size="small" :tags="role_list" />
  </div>
  <el-tooltip effect="dark" :content="$t('layout.logout')" placement="top">
    <el-button text @click="logout" class="logout-button ml-8">
      <el-icon class="color-secondary" style="font-size: 20px">
        <SwitchButton />
      </el-icon>
    </el-button>
  </el-tooltip>
  <ResetPassword ref="resetPasswordRef"></ResetPassword>
  <!-- <UserPwdDialog ref="UserPwdDialogRef" /> -->
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import useStore from '@/stores'
import { useRouter } from 'vue-router'
import { t } from '@/locales'
import ResetPassword from './ResetPassword.vue'
// import UserPwdDialog from '@/views/user-manage/component/UserPwdDialog.vue'

const { user, login } = useStore()
const router = useRouter()

const resetPasswordRef = ref<InstanceType<typeof ResetPassword>>()

const openResetPassword = () => {
  resetPasswordRef.value?.open()
}
const m: any = {
  系统管理员: 'layout.about.inner_admin',
  工作空间管理员: 'layout.about.inner_wsm',
  普通用户: 'layout.about.inner_user',
}
const role_list = computed(() => {
  if (!user.userInfo) {
    return []
  }
  return (user.userInfo.role_name ?? []).map((name) => {
    const inner = m[name]
    if (inner) {
      return t(inner)
    }
    return name
  })
})
const logout = () => {
  login.logout().then(() => {
    if (user?.userInfo?.source && ['CAS', 'OIDC', 'OAuth2'].includes(user.userInfo.source)) {
      router.push({ name: 'login', query: { login_mode: 'manual' } })
    } else {
      router.push({ name: 'login' })
    }
  })
}

onMounted(() => {
  if (user.userInfo?.is_edit_password) {
    resetPasswordRef.value?.open()
  }
})
</script>
<style lang="scss" scoped>
.logout-button.el-button.is-text {
  max-height: 32px;
  padding: 6px !important;
}
</style>
