import {defineStore} from 'pinia'
import {type Ref} from 'vue'
import type {User} from '@/api/type/user'
import UserApi from '@/api/user/user'
import LoginApi from '@/api/user/login'
import {useLocalStorage} from '@vueuse/core'

import {localeConfigKey, getBrowserLang} from '@/locales/index'
import useLoginStore from './login'

export interface userStateTypes {
  userInfo: User | null
  version?: string
  rsaKey: string
}

const useUserStore = defineStore('user', {
  state: (): userStateTypes => ({
    userInfo: null,
    version: '',
    rsaKey: '',
  }),
  actions: {
    getLanguage() {
      return localStorage.getItem('Ragent-locale') || getBrowserLang()
    },
    getWorkspaceId() {
      return localStorage.getItem('workspace_id') || 'default'
    },

    getPermissions() {
      if (this.userInfo) {
        return this.userInfo?.permissions
      } else {
        return []
      }
    },
    getRole() {
      if (this.userInfo) {
        return this.userInfo?.role
      } else {
        return []
      }
    },

    is_admin() {
      return this.userInfo?.role.includes('ADMIN')
    },
    async profile(loading?: Ref<boolean>) {
      return UserApi.getUserProfile(loading).then((ok) => {
        this.userInfo = ok.data
        useLocalStorage<string>(localeConfigKey, 'en-US').value =
          ok?.data?.language || this.getLanguage()
        return this.asyncGetProfile()
      })
    },

    async asyncGetProfile() {
      return new Promise((resolve, reject) => {
        UserApi.getProfile()
          .then(async (ok) => {
            // this.version = ok.data?.version || '-'
            this.version = ok.data.version
            this.rsaKey = ok.data.rsa
            resolve(ok)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async postUserLanguage(lang: string, loading?: Ref<boolean>) {
      return new Promise((resolve, reject) => {
        LoginApi.postLanguage({language: lang}, loading)
          .then(async (ok) => {
            useLocalStorage(localeConfigKey, 'en-US').value = lang
            window.location.reload()
            resolve(ok)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})

export default useUserStore
