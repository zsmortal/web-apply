import { alovaInstance } from '@/utils/alova'

enum Api {
  list = '/admin/acl/user/1/10',
  save = '/sys/position/add',
  edit = '/sys/position/edit',
  delete = '/sys/position/delete',
  importExcel = '/sys/position/importExcel',
  exportXls = '/sys/position/exportXls',
  deleteBatch = '/sys/position/deleteBatch'
}

/**
 * 用户列表
 */
export const getPageList = (data: ObjectType) => alovaInstance.Get(Api.list, { params: { ...data } })

/**
 * 单条删除
 * @param params
 */
export const deleteItem = (data: ObjectType) => alovaInstance.Get(Api.delete, { params: { ...data } })
