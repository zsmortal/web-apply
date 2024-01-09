<template>
  <el-container class="container_page">
    <el-header class="header_box">Header</el-header>
    <el-container class="container_box">
      <el-aside class="aside_box">
        <div v-for="(item, index) in 100" :key="index">{{ item }}</div>
      </el-aside>
      <el-main class="main_box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use './style.scss';
</style>
