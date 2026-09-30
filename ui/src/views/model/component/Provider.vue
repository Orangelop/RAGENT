<template>
  <div class="provider-list">
    <el-scrollbar>
      <div class="p-8">
        <div v-if="showShared" class="border-b mb-4">
          <div
            @click="handleSharedNodeClick"
            class="shared-button flex cursor"
            :class="active?.provider === 'share' && 'active'"
          >
            <AppIcon
              iconName="app-shared-active"
              style="font-size: 18px"
              class="color-primary"
            ></AppIcon>
            <span class="ml-8">{{ $t('views.shared.shared_model') }}</span>
          </div>
        </div>
        <div
          class="all-mode flex cursor"
          @click="clickListHandle(allObj as Provider)"
          :class="!active?.provider ? 'all-mode-active color-primary-1' : ''"
        >
          <AppIcon
            class="mr-8 color-primary"
            style="height: 20px; width: 20px"
            :iconName="'app-all-menu-active'"
          ></AppIcon>
          <span>{{ $t('views.model.modelType.allModel') }}</span>
        </div>

        <common-list
          :data="provider_list"
          v-loading="loading"
          @click="clickListHandle"
          value-key="provider"
          :default-active="active?.provider || ''"
        >
          <template #default="{ row }">
            <div class="flex align-center">
              <span
                :innerHTML="row.icon"
                alt=""
                style="height: 20px; width: 20px"
                class="mr-8"
              />
              <span class="ellipsis-1" :title="row.name">{{ row.name }}</span>
            </div>
          </template>
        </common-list>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
import type { Provider, Model } from '@/api/type/model'
import { modelTypeList, allObj } from '@/views/model/component/data'
import { hasPermission } from '@/utils/permission/index'
import { t } from '@/locales'
const props = defineProps<{
  data: Array<Provider>
  loading: boolean
  showShared?: boolean
  active?: Provider
}>()
const emit = defineEmits(['click'])

const provider_list = ref<Array<Provider>>([])

watch(
  () => props.data,
  (list) => {
    provider_list.value = list.filter((v) => v.provider)
    provider_list.value.sort((a, b) => a.provider.localeCompare(b.provider))
  },
  { immediate: true },
)

const clickListHandle = (item: Provider) => {
  emit('click', item)
}

const handleSharedNodeClick = () => {
  emit('click', { provider: 'share', name: t('views.shared.shared_model') })
}
</script>
<style lang="scss" scoped>
.provider-list {
  height: calc(var(--app-main-height));
  .all-mode {
    padding: 10px 8px;
    font-weight: 400;
    &:hover {
      border-radius: var(--app-border-radius-small);
      background: rgba(var(--el-text-color-primary-rgb), 0.1);
    }
  }
  .all-mode-active {
    border-radius: var(--app-border-radius-small);
    color: var(--el-color-primary);
    font-weight: 500 !important;
    background: var(--el-color-primary-light-9);
    &:hover {
      background: var(--el-color-primary-light-9);
    }
  }
  .shared-button {
    padding: 10px 8px;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 4px;
    &.active {
      background: var(--el-color-primary-light-9);
      border-radius: var(--app-border-radius-small);
      color: var(--el-color-primary);
      font-weight: 500;
      &:hover {
        background: var(--el-color-primary-light-9);
      }
    }
    &:hover {
      border-radius: var(--app-border-radius-small);
      background: rgba(var(--el-text-color-primary-rgb), 0.1);
    }
    &.is-active {
      &:hover {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
      }
    }
  }
}
</style>
