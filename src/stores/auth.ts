import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import type { LoginParams, LoginResponseData } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import { showFailToast, showNotify, showSuccessToast } from 'vant'
import { tr } from 'element-plus/es/locales.mjs'
export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const username = ref('')
    const id = ref('')
    // 是否是陪诊师
    const isCompanion = ref()
    // 是否实名认证
    const isIdentified = ref()
    const setToken = (data: string) => {
      token.value = data
    }
    const setId = (data: string) => {
      id.value = data
    }
    const setUsername = (data: string) => {
      username.value = data
    }
    const setIsCompanion = (data: number) => {
      isCompanion.value = data
    }
    const setIsIdentified = (data: number) => {
      isIdentified.value = data
    }

    // const Logout = () => {
    //   token.value = ''
    //   username.value = ''
    //   id.value = ''
    //   router.push({ path: '/login' })
    // }
    const login = async (data: LoginParams) => {
      try {
        const res: LoginResponseData = await reqLogin(data)
        if (res.code === 200) {
          showSuccessToast('登录成功')
          setToken(res.data.token)
          setUsername(res.data.username)
          setId(res.data.id)
          setIsCompanion(res.data.isCompanion)
          setIsIdentified(res.data.isIdentified)
          router.push({ path: '/home' })
          showNotify({
            type: 'success',
            message: '登录成功！您好，' + username.value || '游客'
          })
        } else {
          showFailToast(res.message || '登录失败！')
        }
      } catch (error) {
        showFailToast('登录失败！')
      }
    }

    return { token, username, id, isCompanion, isIdentified, setToken, login }
  },
  {
    // 启用持久化
    persist: true
  }
)
