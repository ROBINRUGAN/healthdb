import { defineStore } from 'pinia'
import { ref } from 'vue'
import mewImage from '@/assets/me/patient.jpeg'
import router from '@/router'
import type { LoginParams, LoginResponseData, User } from '@/api/user/type'
import { reqLogin, reqUserInfo } from '@/api/user'
import { showFailToast, showNotify, showSuccessToast } from 'vant'
import { id } from 'element-plus/es/locales.mjs'
export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    // 是否是陪诊师
    const isCompanion = ref()
    // 是否实名认证
    const isIdentified = ref()
    const selectedCity = ref('福州')
    const selectedCityCode = ref('350100')
    const currentUser: User = {
      id: 0,
      nickname: '用户' + id,
      telephone: '',
      avatar: '',
      realname: '',
      gender: -1,
      age: -1,
      idNumber: '',
      money: 0
    }
    const setToken = (data: string) => {
      window.localStorage.setItem('auth', data)
      token.value = data
    }
    const setId = (data: number) => {
      currentUser.id = data
    }
    const setNickname = (data: string) => {
      currentUser.nickname = data
    }

    const getGenderStr = () => {
      // -1 未知 0 男 1 女
      switch
      (currentUser.gender) {
        case -1:
          return '未知'
        case 0:
          return '男'
        case 1:
          return '女'
        default:
          return '未知'
      }
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
    const setUserInfo = (data: User) => {
      currentUser.id = data.id
      currentUser.nickname = data.nickname || '用户' + data.id
      currentUser.telephone = data.telephone
      currentUser.avatar = data.avatar || mewImage
      currentUser.realname = data.realname || '未实名'
      currentUser.age = data.age || -1
      currentUser.gender = data.gender || -1
      currentUser.idNumber = data.idNumber || '未实名'
      currentUser.money = data.money || 0
    }

    const isLogin = () => {
      return !!token.value
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
            message: '登录成功！您好，' + (res.data.nickname || '用户 ' + res.data.id) + '！'
          })
        } else {
          showFailToast(res.message || '登录失败！')
        }
      } catch (error) {
        showFailToast('登录失败！')
      }
    }


    const refreshUserInfo = async () => {
      try {
        const res = await reqUserInfo()
        if (res.code === 200) {
          setUserInfo(res.data)
        } else {
          showFailToast(res.message || '获取用户信息失败！')
        }
      } catch (error) {
        showFailToast('获取用户信息失败！')
      }
    }

    return {
      token,
      isCompanion,
      isIdentified,
      setToken,
      selectedCity,
      selectedCityCode,
      currentUser,
      setNickname,
      setId,
      setIsCompanion,
      setIsIdentified,
      setSelectedCity,
      setSelectedCityCode,
      login,
      isLogin,
      refreshUserInfo,
      getGenderStr
    }
  },
  {
    // 启用持久化
    persist: true
  }
)
