<script setup lang="ts">
import { computed } from 'vue'
import UserHeader from '@/layout/layout-header/UserHeader.vue'
import SystemHeader from '@/layout/layout-header/SystemHeader.vue'
import AppMain from '@/layout/app-main/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const {
  params: { folderId }, // id为knowledgeID
  query: { from },
} = route as any

const isShared = computed(() => {
  return (
    (folderId === 'shared' ||
      from === 'systemShare' ||
      from === 'systemManage' ||
      route.path.includes('resource-management')) &&
    route.fullPath != '/home'
  )
})
</script>

<template>
  <div class="app-layout">
    <div class="app-header">
      <SystemHeader v-if="isShared"></SystemHeader>
      <UserHeader v-else />
    </div>
    <div class="app-main">
      <AppMain />
    </div>
  </div>
</template>
<style lang="scss">
@use './index.scss';
</style>
