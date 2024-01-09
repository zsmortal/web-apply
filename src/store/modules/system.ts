import type { System } from 'pinia'
import { setThemeMode, setThemeColor } from '@/hooks/useTheme'

export const useSystemStore = defineStore('system', {
  persist: {
    storage: sessionStorage // 开启后对 state 的数据读写都将持久化，指定缓存方式
  },
  state: (): System => ({
    layoutType: '', // 导航界面风格
    isPageNprogress: true, // 是否开启页面加载进度条
    themeMode: 'auto', // 系统模式（白：light   黑：dark   自动：auto）
    themeColor: '#409eff' // 主题颜色（element-plus）
  }),
  getters: {},
  actions: {
    changeLayoutType(val: string) {
      this.layoutType = val
    },
    changePageNprogress(val: boolean) {
      this.isPageNprogress = val
    },
    changeMode(val: string) {
      this.themeMode = val
      setThemeMode(val)
    },
    changeColor(val: string) {
      this.themeColor = val
      setThemeColor(val)
    }
  }
})
