<template>
  <el-drawer v-model="visibleInternalDesc" size="60%" :append-to-body="true">
    <template #header>
      <div class="flex align-center" style="margin-left: -8px">
        <el-button class="cursor mr-4" link @click.prevent="visibleInternalDesc = false">
          <el-icon :size="20">
            <Back />
          </el-icon>
        </el-button>
        <h4>{{ $t('common.detail') }}</h4>
      </div>
    </template>

    <div>
      <div class="card-header">
        <div class="flex-between">
          <div class="title flex align-center">
            <el-avatar
              v-if="isLocalIcon(toolDetail?.icon)"
              shape="square"
              :size="64"
              style="background: none"
              class="mr-8"
            >
              <img :src="resetUrl(toolDetail.icon)" alt="" />
            </el-avatar>
            <ToolIcon v-else :type="getToolIconType(toolDetail)" :size="64" class="mr-8" />
            <div class="ml-16">
              <h3 class="mb-8">{{ toolDetail.name }}</h3>
              <el-text type="info" v-if="toolDetail?.desc">
                {{ toolDetail.desc }}
              </el-text>
            </div>
          </div>
          <div @click.stop>
            <el-button type="primary" @click="addInternalTool(toolDetail)">
              {{ $t('common.add') }}
            </el-button>
          </div>
        </div>
      </div>
      <MdPreview
        ref="editorRef"
        editorId="preview-only"
        :modelValue="markdownContent"
        style="background: none"
        noImgZoomIn
      />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { resetUrl } from '@/utils/common'
import ToolIcon from '@/components/app-icon/ToolIcon.vue'
const emit = defineEmits(['refresh', 'addTool'])

const visibleInternalDesc = ref(false)
const markdownContent = ref('')
const toolDetail = ref<any>({})

const isLocalIcon = (icon?: string) => icon?.startsWith('./tool/') === true
const getToolIconType = (tool: any) => {
  if (tool?.label === 'workflow_template') return 'WORKFLOW'
  if (tool?.label === 'skill') return 'SKILL'
  if (tool?.label === 'mcp') return 'MCP'
  if (tool?.label === 'data_source') return 'DATA_SOURCE'
  return tool?.tool_type || ''
}

watch(visibleInternalDesc, (bool) => {
  if (!bool) {
    markdownContent.value = ''
  }
})

const open = (data: any, detail: any) => {
  toolDetail.value = detail
  if (data) {
    markdownContent.value = cloneDeep(data)
  }
  visibleInternalDesc.value = true
}

const addInternalTool = (data: any) => {
  emit('addTool', data)
  visibleInternalDesc.value = false
}

defineExpose({
  open,
})
</script>
<style lang="scss"></style>
