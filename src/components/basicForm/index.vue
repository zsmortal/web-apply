<template>
  <div class="page_box mb-4 pl-4 pr-4 pt-5">
    <el-form :model="formData" inline label-position="right" label-width="auto">
      <template v-for="item in formList" :key="item.prop">
        <el-form-item v-if="item.component === 'input'" :label="item.label">
          <el-input v-model="formData[item.prop]" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item v-if="item.component === 'select'" :label="item.label">
          <el-select v-model="formData[item.prop]" placeholder="请选择" clearable>
            <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(item.component)" :label="item.label">
          <el-date-picker v-model="formData[item.prop]" :type="item.component" placeholder="请选择" range-separator="至" start-placeholder="起始日期" end-placeholder="结束日期" clearable @change="(value: any) => changeData(value, item)" />
        </el-form-item>
        <el-form-item v-if="item.component === 'cascader'" :label="item.label">
          <el-cascader v-model="formData[item.prop]" :options="item.options" placeholder="请选择" clearable />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="emit('handleSearch')">查询</el-button>
        <el-button icon="Refresh" @click="emit('handleReset')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { formList, formData } from '@/hooks/usePage'
import moment from 'moment'

// 注册事件
const emit = defineEmits(['handleSearch', 'handleReset'])

// 时间日期组件改变触发
const changeData = (val: any, item: ObjectType) => {
  switch (item.component) {
    case 'date':
      formData.value[item.prop] = moment(val).format('YYYY-MM-DD')
      break
    case 'datetime':
      formData.value[item.prop] = moment(val).format('YYYY-MM-DD HH:mm:ss')
      break
    case 'daterange':
      formData.value[item.double[0].prop] = moment(val[0]).format('YYYY-MM-DD')
      formData.value[item.double[1].prop] = moment(val[1]).format('YYYY-MM-DD')
      break
    case 'datetimerange':
      formData.value[item.double[0].prop] = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
      formData.value[item.double[1].prop] = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      break
  }
}
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
