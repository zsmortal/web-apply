<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { store } from '@/store'

// 设置系统模式
store.system.changeMode(store.system.themeMode)

// 设置主题颜色
store.system.changeColor(store.system.themeColor)

// 监听系统模式
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (store.system.themeMode !== 'auto') return
  store.system.changeMode('auto')
})
</script>

<style lang="scss">
@use '@/styles/app.scss';
@use '@/styles/element.scss';
@use '@/styles/theme.scss';
</style>
