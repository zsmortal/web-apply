import type { App } from 'vue'
import { store } from '@/store'

export default {
  install: (app: App<Element>) => {
    // 防抖指令：n 秒后在执行该事件，若在 n 秒内重复触发，则重新计时
    app.directive('debounce', (el, binding) => {
      const [fn, event = 'click', time = 500] = binding.value
      let timer: any
      el.addEventListener(event, () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => fn(), time)
      })
    })

    // 节流指令：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
    app.directive('throttle', (el, binding) => {
      const [fn, event = 'click', time = 500] = binding.value
      let timer: any, timerEnd: any
      el.addEventListener(event, () => {
        if (timer) {
          clearTimeout(timerEnd)
          return (timerEnd = setTimeout(() => fn(), time))
        }
        fn()
        timer = setTimeout(() => (timer = null), time)
      })
    })

    // 权限指令：根据角色权限是否显示操作按钮
    app.directive('permission', (el, binding) => {
      if (!binding.value || binding.value == undefined || binding.value == null) return
      const result = store.user.buttonCodeList.includes(binding.value)
      if (!result) el.parentNode && el.parentNode.removeChild(el)
    })

    // 复制指令：内容一键复制到剪切板
    app.directive('copy', (el, binding) => {
      if (!binding.value) return
      el.onclick = () => window.navigator.clipboard.writeText(binding.value)
    })
  }
}
