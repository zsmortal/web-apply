import { ref } from 'vue'
import { useRequest } from 'alova'

// 表单列表
const formList = ref<ArrayType>([])
// 表单数据
const formData = ref<ObjectType>({})
// 请求参数
const requestData = ref<ObjectType>({})
// 表格按钮
const tableBtns = ref<ArrayType>([])
// 表格列
const tableColumns = ref<ArrayType>([])
// 表格操作
const tableOperations = ref<ArrayType>([])
// 批量操作
const batchOperations = ref<ArrayType>([])
// 是否自动请求接口
const autoSend = ref<boolean>(false)
// 表格数据
const tableData = ref<ArrayType>([])
// 表格 loading
const loading = ref<boolean>(true)
// 当前页
const currentPage = ref<number>(1)
// 每页条数
const pageSize = ref<number>(10)
// 总条数
const total = ref<number>(0)

/**
 * page
 * @param options 配置项
 * @returns 相关方法及数据
 */
const usePage = (options: ObjectType) => {
  // 页面配置
  const pageConfig = () => {
    Object.keys(options.defaultValue.value).forEach((key: string) => {
      formData.value[key] = options.defaultValue.value[key]
    })
    Object.keys(options.optionsData.value).forEach((key: string) => {
      options.formSchema.forEach((item: ObjectType) => {
        if (item.prop === key) item.options = options.optionsData.value[key]
      })
    })
    Object.keys(options.mapData.value).forEach((key: string) => {
      options.tableColumns.forEach((item: ObjectType) => {
        if (item.prop === key) item.map = options.mapData.value[key]
      })
    })
  }
  pageConfig()

  // 数据
  formList.value = options.formSchema
  requestData.value = formData.value
  tableBtns.value = options.tableBtns
  tableColumns.value = options.tableColumns
  tableOperations.value = options.tableOperations
  batchOperations.value = options.batchOperations
  autoSend.value = options.autoSend

  // 请求接口
  const { send, onSuccess, onError } = useRequest(() => options.api({ ...requestData.value, pageNum: currentPage.value, pageSize: pageSize.value }), { immediate: autoSend.value })
  onSuccess((res: ObjectType) => {
    tableData.value = res.data.records
    total.value = res.data.total
    loading.value = false
  })
  onError(() => {
    loading.value = false
  })
  const sendHttp = () => {
    requestData.value = { ...formData.value }
    options.formSchema.forEach((item: ObjectType) => {
      if (item.double) delete requestData.value[item.prop]
    })
    send()
  }

  // 刷新
  const refresh = () => {
    currentPage.value = 1
    pageSize.value = 10
    sendHttp()
  }

  // 重置表单数据
  const reset = () => {
    requestData.value = formData.value = {}
    pageConfig()
  }

  return {
    sendHttp,
    refresh,
    reset
  }
}

export { tableBtns, tableColumns, tableOperations, batchOperations, tableData, loading, currentPage, pageSize, total, usePage, formList, formData }
