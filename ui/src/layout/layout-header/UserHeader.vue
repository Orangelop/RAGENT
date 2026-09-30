·
<template>
  <div class="app-top-bar-container border-b flex-center">
    <div class="logo mt-4">
      <LogoFull />
    </div>

    <div class="ml-24 flex align-center w-full">
      <TopMenu></TopMenu>
    </div>
    <TopAbout></TopAbout>
    <el-divider class="ml-12 mr-12" direction="vertical" />
    <Avatar></Avatar>
  </div>
</template>
<script setup lang="ts">
import TopMenu from './top-menu/index.vue'
import Avatar from './avatar/index.vue'
import TopAbout from './top-about/index.vue'
</script>
<style lang="scss" scoped>
.app-top-bar-container {
  height: var(--app-header-height);
  box-sizing: border-box;
  padding: var(--app-header-padding);
}
</style>
