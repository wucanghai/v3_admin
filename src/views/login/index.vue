<script setup lang="ts">
import {
  type FormRules,
  type FormInstance,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton
} from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { User, Hide, Lock, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import { setToken } from '@/utils/cache/cookies'

const router = useRouter()

const loginFormRef = ref<FormInstance>()

// 是否隐藏密码
const isPassWord = ref<boolean>(true)
// 是否加载动画
const loading = ref<boolean>(false)

interface ILogin {
  username: 'admin' | 'editor'
  password: string
}

const rules = reactive<FormRules<ILogin>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const form = reactive<ILogin>({
  username: 'admin',
  password: '123456'
})

onMounted(async () => {})

// 登录逻辑
const handleLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        const { code, data } = await login({ ...form })

        if (code === 200) {
          setToken(data.token)
          router.push('/')
        }
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }
  })
}

const handleClick = () => {
  isPassWord.value = !isPassWord.value
}
</script>

<template>
  <div class="login-pages" v-loading="loading">
    <div class="login-pages--container">
      <div class="login-pages--logo">
        <img src="../../assets/layout/logo-text-2.png" />
      </div>
      <ElForm :model="form" :rules="rules" size="large" ref="loginFormRef">
        <ElFormItem label="" prop="username">
          <ElInput
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="form.username"
          />
        </ElFormItem>
        <ElFormItem label="" prop="password">
          <ElInput
            :prefix-icon="Lock"
            :type="isPassWord ? 'password' : 'text'"
            placeholder="请输入密码"
            v-model="form.password"
          >
            <template #suffix>
              <ElIcon @click="handleClick"
                ><component :is="isPassWord ? Hide : View"
              /></ElIcon>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem label="">
          <ElButton
            @click.prevent="handleLogin"
            type="primary"
            class="login-pages--btn"
            >登录</ElButton
          >
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-pages {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &--container {
    background-color: #fff;
    padding: 20px 20px 0px 20px;
    border-radius: 10px;
    width: 450px;
    height: auto;
  }

  &--btn {
    width: 100%;
  }

  &--logo {
    display: flex;
    justify-content: center;
    img {
      height: 150px;
    }
  }
}
</style>
