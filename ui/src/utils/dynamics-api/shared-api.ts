import knowledgeWorkspaceApi from '@/api/knowledge/knowledge'
import documentWorkspaceApi from '@/api/knowledge/document'
import paragraphWorkspaceApi from '@/api/knowledge/paragraph'
import problemWorkspaceApi from '@/api/knowledge/problem'
import termbaseWorkspaceApi from '@/api/knowledge/termbase'
import resourceMappingApi from '@/api/workspace/resource-mapping'
import modelWorkspaceApi from '@/api/model/model'
import toolWorkspaceApi from '@/api/tool/tool'
import applicationWorkspaceApi from '@/api/application/application'
import applicationKeyWorkspaceApi from '@/api/application/application-key'
import workflowVersionWorkspaceApi from '@/api/application/workflow-version'
import chatLogWorkspaceApi from '@/api/application/chat-log'
import resourceAuthorizationWorkspaceApi from '@/api/workspace/resource-authorization'
import triggerApi from '@/api/trigger/trigger'
import workspaceApi from '@/api/workspace/workspace'
import folderWorkspaceApi from '@/api/workspace/folder'


// 普通 API
const workspaceApiMap = {
  knowledge: knowledgeWorkspaceApi,
  model: modelWorkspaceApi,
  tool: toolWorkspaceApi,
  document: documentWorkspaceApi,
  paragraph: paragraphWorkspaceApi,
  problem: problemWorkspaceApi,
  termbase: termbaseWorkspaceApi,
  workspace: workspaceApi,
  application: applicationWorkspaceApi,
  applicationKey: applicationKeyWorkspaceApi,
  workflowVersion: workflowVersionWorkspaceApi,
  chatLog: chatLogWorkspaceApi,
  resourceAuthorization: resourceAuthorizationWorkspaceApi,
  folder: folderWorkspaceApi,
  resourceMapping: resourceMappingApi,
  trigger: triggerApi,
} as any

// 系统分享 API（后端未实现，退化为工作空间 API）
const systemShareApiMap = workspaceApiMap

// 资源管理 API（后端未实现，退化为工作空间 API）
const systemManageApiMap = workspaceApiMap

const data = {
  systemShare: systemShareApiMap,
  workspace: workspaceApiMap,
  systemManage: systemManageApiMap,
  workspaceShare: workspaceApiMap,
}

/** 动态导入 API 模块的函数
 *  loadSharedApi('knowledge', true,'systemShare')
 */
export function loadSharedApi({
                                type,
                                isShared,
                                systemType,
                              }: {
  type: string
  isShared?: boolean | undefined
  systemType?: 'systemShare' | 'workspace' | 'systemManage' | 'workspaceShare'
}) {
  return data[systemType || 'workspace'][type]
}
