<template>
  <el-skeleton :loading="loading" animated>
    <el-row :gutter="16">
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-16">
        <el-card class="resource-card cursor" shadow="never" @click="router.push('/model')">
          <div class="resource-content">
            <div class="flex align-center">
              <el-avatar :size="48" shape="square" style="background: rgba(var(--el-text-color-primary-rgb), 0.1)">
                <appIcon
                  iconName="app-model-active"
                  :style="{ fontSize: '28px', color: '#00A884' }"
                />
              </el-avatar>
              <div class="ml-12">
                <p class="color-secondary lighter mb-4">{{ $t('views.model.title') }}</p>
                <h2 class="large-number">{{ toThousands(modelAggregation?.total || 0) }}</h2>
              </div>
            </div>
            <el-row class="resource-stats">
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('home.llm') }}</p>
              <h2>{{ toThousands(modelAggregation?.llm_count || 0) }}</h2>
            </el-col>
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('home.embedding') }}</p>
              <h2>{{ toThousands(modelAggregation?.embedding_count || 0) }}</h2>
            </el-col>
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('common.other') }}</p>
              <h2>
                {{
                  toThousands(
                    modelAggregation?.total -
                      modelAggregation?.llm_count -
                      modelAggregation?.embedding_count || 0,
                  )
                }}
              </h2>
            </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-16">
        <el-card class="resource-card cursor" shadow="never" @click="router.push('/tool')">
          <div class="resource-content">
            <div class="flex align-center">
              <el-avatar :size="48" shape="square" style="background: rgba(var(--el-text-color-primary-rgb), 0.1)">
                <appIcon iconName="app-tool-active" :style="{ fontSize: '28px', color: '#00A884' }" />
              </el-avatar>
              <div class="ml-12">
                <p class="color-secondary lighter mb-4">{{ $t('common.tool') }}</p>
                <h2 class="large-number">{{ toThousands(toolAggregation?.total || 0) }}</h2>
              </div>
            </div>
            <el-row class="resource-stats">
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('common.tool') }}</p>
              <h2>{{ toThousands(toolAggregation?.custom_count || 0) }}</h2>
            </el-col>
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('workflow.workflow') }}</p>
              <h2>{{ toThousands(toolAggregation?.workflow_count || 0) }}</h2>
            </el-col>
            <el-col :span="8">
              <p class="color-secondary lighter mb-4">{{ $t('common.other') }}</p>
              <h2>
                {{
                  toThousands(
                    toolAggregation?.total -
                      toolAggregation?.custom_count -
                      toolAggregation?.workflow_count || 0,
                  )
                }}
              </h2>
            </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-16">
        <el-card class="resource-card cursor" shadow="never" @click="router.push('/knowledge')">
          <div class="resource-content">
            <div class="flex align-center">
              <el-avatar :size="48" shape="square" style="background: rgba(var(--el-text-color-primary-rgb), 0.1)">
                <appIcon
                  iconName="app-knowledge-active"
                  :style="{ fontSize: '28px', color: '#00A884' }"
                />
              </el-avatar>
              <div class="ml-12">
                <p class="color-secondary lighter mb-4">{{ $t('views.knowledge.title') }}</p>
                <h2 class="large-number">{{ toThousands(knowledgeAggregation?.total || 0) }}</h2>
              </div>
            </div>
            <el-row class="resource-stats">
            <el-col :span="12">
              <p class="color-secondary lighter mb-4">{{ $t('common.fileUpload.document') }}</p>
              <h2>{{ toThousands(knowledgeAggregation?.document_count || 0) }}</h2>
            </el-col>
            <el-col :span="12">
              <p class="color-secondary lighter mb-4">{{ $t('common.status.fail') }}</p>
              <h2>{{ toThousands(knowledgeAggregation?.failure_count || 0) }}</h2>
            </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="mb-16">
        <el-card class="resource-card cursor" shadow="never" @click="router.push('/application')">
          <div class="resource-content">
            <div class="flex align-center">
              <el-avatar :size="48" shape="square" style="background: rgba(var(--el-text-color-primary-rgb), 0.1)">
                <appIcon
                  iconName="app-agent-active"
                  :style="{ fontSize: '28px', color: '#00A884' }"
                />
              </el-avatar>
              <div class="ml-12">
                <p class="color-secondary lighter mb-4">{{ $t('views.application.title') }}</p>
                <h2 class="large-number">{{ toThousands(applicationAggregation?.total || 0) }}</h2>
              </div>
            </div>
            <el-row class="resource-stats">
            <el-col :span="12">
              <p class="color-secondary lighter mb-4">{{ $t('common.status.published') }}</p>
              <h2>{{ toThousands(applicationAggregation?.publish_count || 0) }}</h2>
            </el-col>
            <el-col :span="12">
              <p class="color-secondary lighter mb-4">{{ $t('common.status.unpublished') }}</p>
              <h2>{{ toThousands(applicationAggregation?.un_publish_count || 0) }}</h2>
            </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-skeleton>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import homeApi from '@/api/home-page/home'
import { toThousands } from '@/utils/common'
const router = useRouter()
const loading = ref(true)
const applicationAggregation = ref()
const knowledgeAggregation = ref()
const toolAggregation = ref()
const modelAggregation = ref()

function getDetail() {
  homeApi.getApplicationAggregation(loading).then((res: any) => {
    applicationAggregation.value = res.data
  })
  homeApi.getKnowledgeAggregation(loading).then((res: any) => {
    knowledgeAggregation.value = res.data
  })
  homeApi.getToolAggregation(loading).then((res: any) => {
    toolAggregation.value = res.data
  })
  homeApi.getModelAggregation(loading).then((res: any) => {
    modelAggregation.value = res.data
  })
}
onMounted(() => {
  getDetail()
})
</script>
<style lang="scss" scoped>
.large-number {
  font-size: 32px;
  font-weight: 500;
}
.resource-card {
  .resource-content {
    display: flex;
    align-items: center;
    gap: 20%;
  }

  .resource-stats {
    flex: 1;
    text-align: center;
  }

  &:hover {
    border-color: var(--el-color-primary) !important;
  }
}
</style>
