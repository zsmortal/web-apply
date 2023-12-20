import type { Data } from 'pinia'

export const useDataStore = defineStore('data', {
  persist: {
    storage: sessionStorage // 开启后对 state 的数据读写都将持久化，指定缓存方式
  },
  state: (): Data => ({}),
  getters: {},
  actions: {}
})
