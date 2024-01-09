import { alovaInstance } from '@/utils/alova'

enum Api {
  login = '/admin/acl/index/login'
}

/**
 * 账号密码登录
 */
export const login = (data: ObjectType) => alovaInstance.Post(Api.login, data)
