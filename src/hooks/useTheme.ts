import { getLightColor, getDarkColor } from '@/utils/color'

/**
 * 修改系统模式
 * @param {string} value 模式类型
 */
export const setThemeMode = (value: string) => {
  let mode: string = ''
  if (value === 'auto') mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  else mode = value
  if (document.documentElement.classList.contains('dark')) document.documentElement.classList.remove('dark')
  if (document.documentElement.classList.contains('light')) document.documentElement.classList.remove('light')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
}

/**
 * 修改主题颜色
 * @param value rgb 颜色值
 */
export const setThemeColor = (value: string) => {
  document.documentElement.style.setProperty('--el-color-primary', value)
  document.documentElement.style.setProperty('--el-color-primary-dark', getDarkColor(value, 0.2) as string)
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, getDarkColor(value, i / 10) as string)
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, getLightColor(value, i / 10) as string)
  }
}
