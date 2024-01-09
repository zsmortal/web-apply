<template>
  <div class="page_box p-4">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <el-button v-for="(item, index) in tableBtns" :key="index" :type="item.type" :icon="item.icon" @click="emit('handleTableBtns', item.method)">{{ item.label }}</el-button>
      </div>
      <div>
        <el-tooltip content="刷新表格">
          <el-icon class="ml-4 cursor-pointer" :class="{ rotated: isRotated }" size="22" @click="(isRotated = true), handleRefresh()"><RefreshRight /></el-icon>
        </el-tooltip>
        <el-tooltip content="列设置">
          <el-icon class="ml-4 cursor-pointer" size="22" @click="drawer = true"><Setting /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <el-table v-loading="loading" :data="tableData" highlight-current-row border :header-cell-class-name="headerCellClassName" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="46" fixed align="center" />
      <el-table-column type="index" label="#" width="60" fixed align="center" />
      <template v-for="item in tableColumns" :key="item">
        <el-table-column v-if="item.isShow" :prop="item.prop" :label="item.label" :sortable="item.sortable" :width="item.width" :min-width="item.minWidth" :show-overflow-tooltip="item.type !== 'image'">
          <template v-if="item.type === 'datetime'" #default="{ row }">
            {{ moment(row[item.prop]).format('YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
          <template v-else-if="item.type === 'map'" #default="{ row }">
            {{ item.map[row[item.prop]] || '-' }}
          </template>
          <template v-else-if="item.type === 'link'" #default="{ row }">
            <el-button type="primary" link @click="emit('handleRowLink', row)">{{ row[item.prop] }}</el-button>
          </template>
          <template v-else-if="item.type === 'image'" #default="{ row }">
            <el-image :src="row[item.prop]" fit="cover" alt="加载失败" preview-teleported :preview-src-list="[row[item.prop]]" />
          </template>
          <template v-else-if="item.type === 'slot'" #default="{ row }">
            <slot :name="item.slotName" v-bind="{ row, extend: item }"></slot>
          </template>
          <template v-else #default="{ row }">
            {{ row[item.prop] === 0 || row[item.prop] ? row[item.prop] : '-' }}
          </template>
        </el-table-column>
      </template>
      <el-table-column fixed="right" label="操作" align="center" :width="tableOperations.length * 70 + 20">
        <template #default="{ row }">
          <el-button v-for="(item, index) in tableOperations" :key="index" :type="item.type" link :icon="item.icon" @click="emit('handleTableOperations', item.method, row)">{{ item.label }}</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div class="mt-4 flex items-center justify-between">
      <div>
        <el-button v-for="(item, index) in batchOperations" :key="index" :type="item.type" :icon="item.icon" :disabled="multipleSelection.length <= 0" @click="emit('handleBatchOperations', item.method, multipleSelection)">{{ item.label }}</el-button>
      </div>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper" @change="emit('handleCurrentChange')" />
    </div>
  </div>

  <el-drawer v-model="drawer" title="列设置" lock-scroll append-to-body>
    <el-table :data="tableColumns" border :header-cell-style="{ textAlign: 'center' }">
      <el-table-column prop="label" label="列名" align="center" />
      <el-table-column prop="isShow" label="显示" align="center" v-slot="scope">
        <el-switch v-model="scope.row.isShow"></el-switch>
      </el-table-column>
      <el-table-column prop="sortable" label="排序" align="center" v-slot="scope">
        <el-switch v-model="scope.row.sortable"></el-switch>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script setup lang="ts">
import { tableBtns, tableColumns, tableOperations, batchOperations, tableData, loading, currentPage, pageSize, total } from '@/hooks/usePage'
import moment from 'moment'

// 自定义表头样式
const headerCellClassName = () => {
  return 'table_header'
}

// 设置排序字段
tableColumns.value.forEach((item: ObjectType) => {
  item.isShow = true
  item.sortable = false
})

// 注册事件
const emit = defineEmits(['handleTableBtns', 'handleTableOperations', 'handleBatchOperations', 'handleCurrentChange', 'handleRefresh', 'handleRowLink'])
// 刷新
const isRotated = ref<boolean>(false)
const handleRefresh = () => {
  setTimeout(() => {
    isRotated.value = false
  }, 1000)
  emit('handleRefresh')
}

// 多选
const multipleSelection = ref<ArrayType>([])
const handleSelectionChange = (val: ArrayType) => (multipleSelection.value = val)

// 表格设置弹窗
const drawer = ref<boolean>(false)
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
