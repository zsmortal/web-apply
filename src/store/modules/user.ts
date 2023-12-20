import type { User } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: {
    storage: sessionStorage // 开启后对 state 的数据读写都将持久化，指定缓存方式
  },
  state: (): User => ({
    token: '', // 用户 token
    info: {}, // 用户信息
    buttonCodeList: [] // 按钮权限
  }),
  getters: {},
  actions: {
    changeToken(val: string) {
      this.token = val
    },
    changeInfo(val: ObjectType) {
      this.info = val
    },
    changeButtonCodeList(val: ArrayType) {
      this.buttonCodeList = val
    }
  }
})
