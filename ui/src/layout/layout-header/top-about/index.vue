<template>
  <div class="flex align-center top-about">
    <el-tooltip
      v-if="
        hasPermission(
          [
            RoleConst.EXTENDS_ADMIN,
            RoleConst.EXTENDS_WORKSPACE_MANAGE,
            RoleConst.ADMIN,
            RoleConst.WORKSPACE_MANAGE,
          ],
          'OR',
        ) && type === 'workspace'
      "
      effect="dark"
      :content="$t('views.system.title')"
      placement="top"
    >
      <el-button
        text
        @click="router.push({ path: '/system/user' })"
        :class="route.path.includes('/system') ? 'active' : ''"
      >
        <el-icon
          :class="route.path.includes('/system') ? 'color-primary' : 'color-secondary'"
          style="font-size: 20px"
        >
          <Setting />
        </el-icon>
      </el-button>
    </el-tooltip>
    <el-dropdown
      v-if="
        hasPermission(
          new ComplexPermission(
            [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE, RoleConst.USER],
            [PermissionConst.SWITCH_LANGUAGE],
            'OR',
          ),
          'OR',
        ) && ['workspace', 'system'].includes(type)
      "
      trigger="hover"
      placement="bottom-end"
      class="ml-8"
    >
      <el-button text>
        <el-icon class="color-secondary" style="font-size: 20px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            />
          </svg>
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="w-180">
          <el-dropdown-item
            v-for="(lang, index) in langList"
            :key="index"
            :value="lang.value"
            @click="changeLang(lang.value)"
            class="flex-between"
          >
            <span :class="lang.value === user.userInfo?.language ? 'primary' : ''">{{
              lang.label
            }}</span>
            <el-icon
              :class="lang.value === user.userInfo?.language ? 'primary' : ''"
              v-if="lang.value === user.userInfo?.language"
            >
              <Check />
            </el-icon>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { hasPermission } from '@/utils/permission'
import { PermissionConst, RoleConst } from '@/utils/permission/data'
import { ComplexPermission } from '@/utils/permission/type'
import { langList } from '@/locales/index'
import useStore from '@/stores'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { user } = useStore()

const changeLang = (lang: string) => {
  user.postUserLanguage(lang)
}

withDefaults(defineProps<{ type?: 'workspace' | 'system' }>(), {
  type: 'workspace',
})
</script>
<style scoped lang="scss">
.top-about {
  .el-button.is-text {
    max-height: 32px;
    padding: 6px !important;
  }
  .el-button + .el-button {
    margin-left: 8px !important;
  }
  .active {
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(var(--el-text-color-primary-rgb), 0.12);
    &:hover {
      background: #ffffff;
    }
  }
}
</style>
