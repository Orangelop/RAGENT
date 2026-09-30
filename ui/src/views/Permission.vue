<template>
  <div>说明: v-hasPermission 是使用v-show 本质上组件是渲染的 v-if="hasPermission('xxxx')"</div>
  <div>这种方式组件不会渲染(用于比如像组件挂载的时候需要调用接口,不想让组件渲染)</div>

  <!-- ================ADMIN角色================== -->
  <button v-if="hasPermission(RoleConst.ADMIN, 'OR')">我是ADMIN角色</button>
  <button v-hasPermission="new ComplexPermission([RoleConst.ADMIN], [], 'AND')">
    我是ADMIN角色
  </button>
  <!-- ================当前工作空间管理员================== -->
  <button
    v-if="hasPermission(RoleConst.WORKSPACE_MANAGE.getWorkspaceRole, 'OR')"
  >
    我拥有当前工作空间管理员角色
  </button>
  <button
    v-hasPermission="
      new ComplexPermission(
        [RoleConst.WORKSPACE_MANAGE.getWorkspaceRole],
        [],
        'OR',
      )
    "
  >
    我拥有当前工作空间管理员角色
  </button>
  <!-- ================当前工作空间管理员 或者有用户只读================== -->
  <button
    v-if="
      hasPermission(
        new ComplexPermission(
          [RoleConst.WORKSPACE_MANAGE.getWorkspaceRole],
          [PermissionConst.USER_READ],
          'OR',
        ),
        'OR',
      )
    "
  >
    我是当前工作空间管理员 或者有用户只读
  </button>
  <button
    v-hasPermission="
      new ComplexPermission(
        [RoleConst.WORKSPACE_MANAGE.getWorkspaceRole],
        [PermissionConst.USER_READ],
        'OR',
      )
    "
  >
    我是当前工作空间管理员 或者有用户只读
  </button>
</template>
<script setup lang="ts">
import {PermissionConst, RoleConst} from '@/utils/permission/data'
import { hasPermission } from '@/utils/permission/index'
import { ComplexPermission } from '@/utils/permission/type'
</script>
<style lang="scss" scoped></style>
