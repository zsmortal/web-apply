export const data: ObjectType = {
  formSchema: [
    {
      label: '输入框',
      prop: 'username',
      component: 'input'
    },
    {
      label: '下拉框',
      prop: 'password',
      component: 'select'
    },
    {
      label: '日期',
      prop: 'data',
      component: 'date'
    },
    {
      label: '日期时间',
      prop: 'datetime',
      component: 'datetime'
    },
    {
      label: '日期范围',
      prop: 'daterange',
      component: 'daterange',
      double: [{ prop: 'startDate' }, { prop: 'endDate' }]
    },
    {
      label: '日期时间范围',
      prop: 'datetimerange',
      component: 'datetimerange',
      double: [{ prop: 'startDateTime' }, { prop: 'endDateTime' }]
    },
    {
      label: '地址',
      prop: 'address',
      component: 'cascader'
    }
  ],
  tableBtns: [
    {
      label: '新增',
      method: 'add',
      type: 'primary',
      icon: 'Plus'
    },
    {
      label: '导出',
      method: 'download',
      type: 'primary',
      icon: 'Download'
    },
    {
      label: '导入',
      method: 'upload',
      type: 'primary',
      icon: 'Upload'
    }
  ],
  tableColumns: [
    {
      label: 'id',
      prop: 'id',
      type: 'slot',
      slotName: 'haha'
    },
    {
      label: '用户名',
      prop: 'name',
      type: 'link'
    },
    {
      label: '用户昵称',
      prop: 'username',
      type: 'link'
    },
    {
      label: '用户角色',
      prop: 'roleName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '更新时间',
      prop: 'updateTime'
    }
  ],
  tableOperations: [
    {
      label: '编辑',
      method: 'edit',
      type: 'primary',
      icon: 'Edit'
    },
    {
      label: '删除',
      method: 'del',
      type: 'danger',
      icon: 'Delete'
    },
    {
      label: '详情',
      method: 'detail',
      type: 'primary',
      icon: 'View'
    }
  ],
  batchOperations: [
    {
      label: '批量修改',
      method: 'edit',
      type: 'primary',
      icon: 'Edit'
    },
    {
      label: '批量删除',
      method: 'del',
      type: 'danger',
      icon: 'Delete'
    }
  ]
}
