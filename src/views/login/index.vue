<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useRequest } from 'alova'
import { login } from '@/api/login'
import { store } from '@/store'
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ObjectType>({
  username: 'admin',
  password: 'atguigu123'
})

const rules = reactive<FormRules<ObjectType>>({
  username: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      send()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const { send, onSuccess } = useRequest(() => login(ruleForm), { immediate: false })
onSuccess((res: ObjectType) => {
  store.user.changeToken(res.data)
  router.replace('/system/user')
})
</script>

<style scoped lang="scss"></style>
