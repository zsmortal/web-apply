<template>
  <BasicForm @handle-search="sendHttp" @handle-reset="reset"></BasicForm>
  <BasicTable @handle-table-btns="handleTableBtns" @handle-table-operations="handleTableOperations" @handle-batch-operations="handleBatchOperations" @handle-current-change="sendHttp" @handle-refresh="refresh" @handle-row-link="handleRowLink">
    <template #haha="{ row }">
      <span>{{ row.id }}</span>
    </template>
  </BasicTable>
</template>

<script setup lang="ts">
import { data } from './data'
import { getPageList } from '@/api/user'
import { usePage } from '@/hooks/usePage'
import { Delete } from '@element-plus/icons-vue'

const defaultValue = ref({})
const optionsData = ref({})
const mapData = ref({})
const { sendHttp, reset, refresh } = usePage({
  ...data,
  defaultValue,
  optionsData,
  mapData,
  autoSend: true,
  api: getPageList
})

const handleTableBtns = (method: string) => {
  console.log(method)
}

const handleTableOperations = (method: string, row: ObjectType) => {
  console.log(method)
  console.log(row)
  ElMessageBox.confirm('确认删除选中数据吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    icon: markRaw(Delete)
  })
    .then(() => {
      console.log(1)
    })
    .catch(() => {
      console.log(2)
    })
}

const handleBatchOperations = (method: string, multipleSelection: ArrayType) => {
  console.log(method)
  console.log(multipleSelection)
}

const handleRowLink = (row: ObjectType) => {
  console.log(row)
}
</script>

<style scoped lang="scss"></style>
