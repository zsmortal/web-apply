import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import { router } from '@/router'
import Qs from 'qs'

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_PROXY_API,
  statesHook: VueHook,
  timeout: 10000,
  localCache: null,
  requestAdapter: GlobalFetch(),
  beforeRequest: (method) => {
    if (method.config.headers.isFormData) {
      method.config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      method.data = Qs.stringify(method.data)
    } else {
      method.config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    method.config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem('token')}`
  },
  responded: {
    onSuccess: async (response) => {
      const json = await response.json()
      if (json.code === 401) {
        // showToast('登录过期，请重新登录')
        window.sessionStorage.clear()
        router.push('/')
      } else if (json.code !== 200) {
        // showToast(json.msg)
        throw new Error(json.message)
      }
      return json.data
    },
    onError: (err) => {
      throw new Error(err)
    }
  }
})
