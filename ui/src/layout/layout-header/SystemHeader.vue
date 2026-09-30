·
<template>
  <div class="app-top-bar-container border-b flex-center">
    <div class="logo mt-4">
      <LogoFull />
    </div>

    <div class="flex-between w-full align-center">
      <h4><el-divider class="ml-16 mr-16" direction="vertical" />{{ $t('views.system.title') }}</h4>
      <div class="flex align-center">
        <el-tooltip
          effect="dark"
          :content="$t('views.workspace.toWorkspace')"
          placement="top"
          v-if="
            hasPermission(
              [
                RoleConst.USER.getWorkspaceRole,
                RoleConst.EXTENDS_USER.getWorkspaceRole,
                RoleConst.EXTENDS_WORKSPACE_MANAGE.getWorkspaceRole,
                RoleConst.WORKSPACE_MANAGE.getWorkspaceRole,
              ],
              'OR',
            )
          "
        >
          <el-button text @click="goHome" class="to-workspace-button">
            <el-icon class="color-secondary" style="font-size: 20px">
              <Grid />
            </el-icon>
          </el-button>
        </el-tooltip>
        <TopAbout type="system"></TopAbout>
      </div>
    </div>
    <el-divider class="ml-12 mr-12" direction="vertical" />
    <Avatar></Avatar>
  </div>
</template>
<script setup lang="ts">
import { RoleConst } from '@/utils/permission/data'
import Avatar from './avatar/index.vue'
import TopAbout from './top-about/index.vue'
import { useRouter } from 'vue-router'
import { hasPermission } from '@/utils/permission'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
.app-top-bar-container {
  height: var(--app-header-height);
  box-sizing: border-box;
  padding: var(--app-header-padding);
}
.to-workspace-button.el-button.is-text {
  max-height: 32px;
  padding: 6px !important;
}
</style>
