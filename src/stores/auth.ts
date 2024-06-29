import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import type { LoginParams, LoginResponseData } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import { showFailToast, showNotify, showSuccessToast } from 'vant'
export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const nickname = ref('')
    const id = ref('')
    // 是否是陪诊师
    const isCompanion = ref()
    // 是否实名认证
    const isIdentified = ref()
    const selectedCity = ref('福州')
    const selectedCityCode = ref('350100')
    const setToken = (data: string) => {
      token.value = data
    }
    const setId = (data: string) => {
      id.value = data
    }
    const setNickname = (data: string) => {
      nickname.value = data
    }
    const setIsCompanion = (data: number) => {
      isCompanion.value = data
    }
    const setIsIdentified = (data: number) => {
      isIdentified.value = data
    }
    const setSelectedCity = (data: string) => {
      selectedCity.value = data
    }
    const setSelectedCityCode = (data: string) => {
      selectedCityCode.value = data
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
          setNickname(res.data.nickname)
          setId(res.data.id)
          setIsCompanion(res.data.isCompanion)
          setIsIdentified(res.data.isIdentified)
          router.push({ path: '/home' })
          showNotify({
            type: 'success',
            message: '登录成功！您好，' +(nickname.value ? nickname.value : '游客')
          })
        } else {
          showFailToast(res.message || '登录失败！')
        }
      } catch (error) {
        showFailToast('登录失败！')
      }
    }

    return { token, nickname, id, isCompanion, isIdentified, setToken,selectedCity,selectedCityCode, setNickname, setId, setIsCompanion, setIsIdentified, setSelectedCity, setSelectedCityCode, login}
  },
  {
    // 启用持久化
    persist: true
  }
)
