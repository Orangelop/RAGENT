import {PermissionConst, RoleConst} from '@/utils/permission/data'
import { ComplexPermission } from '@/utils/permission/type'

const systemRouter = {
  path: '/system',
  name: 'system',
  meta: { title: 'views.system.title' },
  hidden: true,
  component: () => import('@/layout/layout-template/SystemMainLayout.vue'),
  children: [
    {
      path: '/system/user',
      name: 'user',
      meta: {
        icon: 'User',
        iconActive: 'UserFilled',
        title: 'views.userManage.title',
        activeMenu: '/system',
        parentPath: '/system',
        parentName: 'system',
        sameRoute: 'user',
        permission: [RoleConst.ADMIN, PermissionConst.USER_READ],
      },
      component: () => import('@/views/system/user-manage/index.vue'),
    },
    {
      path: '/system/authorization',
      name: 'authorization',
      meta: {
        icon: 'app-resource-authorization',
        iconActive: 'app-resource-authorization-active',
        title: 'views.system.resourceAuthorization.title',
        activeMenu: '/system',
        parentPath: '/system',
        parentName: 'system',
        sameRoute: 'authorization',
        permission: [
          new ComplexPermission(
            [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
            [
              PermissionConst.APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
              PermissionConst.APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                .getWorkspacePermissionWorkspaceManageRole,
            ],
            'OR',
          ),
          new ComplexPermission(
            [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
            [
              PermissionConst.KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
              PermissionConst.KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                .getWorkspacePermissionWorkspaceManageRole,
            ],
            'OR',
          ),
          new ComplexPermission(
            [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
            [
              PermissionConst.TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
              PermissionConst.TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                .getWorkspacePermissionWorkspaceManageRole,
            ],
            'OR',
          ),
          new ComplexPermission(
            [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
            [
              PermissionConst.MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
              PermissionConst.MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                .getWorkspacePermissionWorkspaceManageRole,
            ],
            'OR',
          ),
        ],
      },

      children: [
        {
          path: '/system/authorization/application',
          name: 'authorizationApplication',
          meta: {
            title: 'views.application.title',
            activeMenu: '/system',
            parentPath: '/system',
            parentName: 'system',
            resource: 'APPLICATION',
            sameRoute: 'authorization',
            permission: [
              new ComplexPermission(
                [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
                [
                  PermissionConst.APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
                  PermissionConst.APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                    .getWorkspacePermissionWorkspaceManageRole,
                ],
                'OR',
              ),
            ],
          },
          component: () => import('@/views/system/resource-authorization/index.vue'),
        },
        {
          path: '/system/authorization/knowledge',
          name: 'authorizationKnowledge',
          meta: {
            title: 'views.knowledge.title',
            activeMenu: '/system',
            parentPath: '/system',
            parentName: 'system',
            resource: 'KNOWLEDGE',
            sameRoute: 'authorization',
            permission: [
              new ComplexPermission(
                [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
                [
                  PermissionConst.KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
                  PermissionConst.KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                    .getWorkspacePermissionWorkspaceManageRole,
                ],
                'OR',
              ),
            ],
          },
          component: () => import('@/views/system/resource-authorization/index.vue'),
        },
        {
          path: '/system/authorization/tool',
          name: 'authorizationTool',
          meta: {
            title: 'views.tool.title',
            activeMenu: '/system',
            parentPath: '/system',
            parentName: 'system',
            resource: 'TOOL',
            sameRoute: 'authorization',
            permission: [
              new ComplexPermission(
                [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
                [
                  PermissionConst.TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
                  PermissionConst.TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                    .getWorkspacePermissionWorkspaceManageRole,
                ],
                'OR',
              ),
            ],
          },
          component: () => import('@/views/system/resource-authorization/index.vue'),
        },
        {
          path: '/system/authorization/model',
          name: 'authorizationModel',
          meta: {
            title: 'views.model.title',
            activeMenu: '/system',
            parentPath: '/system',
            parentName: 'system',
            resource: 'MODEL',
            sameRoute: 'authorization',
            permission: [
              new ComplexPermission(
                [RoleConst.ADMIN, RoleConst.WORKSPACE_MANAGE],
                [
                  PermissionConst.MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_READ,
                  PermissionConst.MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_READ
                    .getWorkspacePermissionWorkspaceManageRole,
                ],
                'OR',
              ),
            ],
          },
          component: () => import('@/views/system/resource-authorization/index.vue'),
        },
      ],
    },
    {
      path: '/system/setting',
      name: 'setting',
      meta: {
        icon: 'app-setting',
        iconActive: 'app-setting-active',
        title: 'views.system.subTitle',
        activeMenu: '/system',
        parentPath: '/system',
        parentName: 'system',
        sameRoute: 'setting',
        permission: [
          new ComplexPermission([RoleConst.ADMIN], [PermissionConst.EMAIL_SETTING_READ], 'OR'),
        ],
      },
      children: [
        {
          path: '/system/email',
          name: 'email',
          meta: {
            title: 'views.system.email.title',
            activeMenu: '/system',
            parentPath: '/system',
            parentName: 'system',
            sameRoute: 'setting',
            permission: [
              new ComplexPermission(
                [RoleConst.ADMIN],
                [PermissionConst.EMAIL_SETTING_READ],
                'OR',
              ),
            ],
          },
          component: () => import('@/views/system-setting/email/index.vue'),
        },
      ],
    },
  ],
}

export default systemRouter
