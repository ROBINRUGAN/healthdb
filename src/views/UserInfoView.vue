<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { useAuthStore } from '@/stores/auth'
import type { ModifyAvatarParams, ModifyUserInfoParams } from '@/api/user/type'
import { reqIdentify, reqModifyUserAvatar, reqModifyUserInfo } from '@/api/user'
import type { ResponseData } from '@/api/type'

const router = useRouter()
const userStore = useAuthStore()
const showNickDialog = ref(false)
const showGenderDialog = ref(false)
const showRealNameDialog = ref(false)
const modifyRealname = ref('')
const modifyIdNumber = ref('')
const currentUser = userStore.currentUser
const selectedGender = ref(currentUser.gender || 0)
const avatarInputRef = ref<HTMLInputElement | null>(null)
const userInfo = ref({
  avatar: currentUser.avatar,
  nickname: currentUser.nickname || currentUser.telephone || '用户 ' + currentUser.id,
  realName: currentUser.realname,
  // -1: 未知, 0: 男, 1: 女
  genderStr: userStore.getGenderStr(),
  idCard: currentUser.idNumber,
  phone: currentUser.telephone,
  id: currentUser.id
})

const goBack = () => {
  router.go(-1)
}

// 修改昵称
const modifyNick = async () => {
  if (!userInfo.value.nickname) {
    showFailToast({ message: '昵称不能为空' })
    return
  }
  modifyUserInfo({
    id: userInfo.value.id,
    nickname: userInfo.value.nickname
  })
}

// 修改性别
const modifyGender = async () => {
  // 未修改性别
  if (selectedGender.value === currentUser.gender) {
    return
  }
  modifyUserInfo({
    id: userInfo.value.id,
    gender: selectedGender.value
  })
  userInfo.value.genderStr = selectedGender.value === 0 ? '女' : '男'
}

// 修改头像
const modifyAvatar = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) {
    return
  }
  const url = await userStore.uploadFile(file)
  if (url) {
    const data: ModifyAvatarParams = {
      uid: userInfo.value.id,
      avatar: url
    }
    const res: ResponseData = await reqModifyUserAvatar(data)
    if (res.code === 200) {
      showSuccessToast({ message: '修改成功' })
      // userStore.refreshUserInfo()
      userInfo.value.avatar = url
    } else {
      showFailToast({ message: res.message || '修改失败' })
    }
  }
}

const triggerAvatarUpload = () => {
  avatarInputRef.value?.click()
}

// 实名认证
const identify = async () => {
  if (modifyRealname.value === '' || modifyIdNumber.value === '') {
    showFailToast({ message: '姓名和身份证号不能为空' })
    return
  }
  if (userStore.isIdentified !== 0) {
    showFailToast({ message: '已完成实名认证，不可修改' })
    return
  }
  showLoadingToast({
    message: '认证中...',
    duration: 4000,
    forbidClick: true
  })
  try {
    const res: ResponseData = await reqIdentify({
      id: userInfo.value.id,
      name: modifyRealname.value,
      identity: modifyIdNumber.value
    })
    if (res.code === 200) {
      // userStore.refreshUserInfo()
      showSuccessToast({
        message: '认证成功'
      })
      showRealNameDialog.value = false
      userStore.setIsIdentified(1)
      userInfo.value.idCard = modifyIdNumber.value.replace(/(\d{3})\d+(\d{4})/, '$1****$2')
      userInfo.value.realName = modifyRealname.value.replace(/(\S)\S+/, '$1**') 
    } else {
      showFailToast({ message: res.message || '认证失败' })
    }
  } catch (error) {
    showFailToast({ message: '认证失败' })
  }
}

// 点击实名认证确认按钮时再次确认，确认后不可修改
const handleIdentifyConfirm = () => {
  showConfirmDialog({
    title: '确认提交实名认证信息吗？',
    message: '提交后不可修改，请确认信息准确无误。'
  })
    .then(() => {
      identify()
    })
    .catch(() => {})
}

// 修改用户信息通用方法
const modifyUserInfo = async (params: ModifyUserInfoParams) => {
  showLoadingToast({
    message: '修改中...',
    duration: 5000,
    forbidClick: true
  })
  try {
    const res: ResponseData = await reqModifyUserInfo(params)
    if (res.code === 200) {
      showSuccessToast({
        message: '修改成功',
        duration: 2000,
        forbidClick: true
      })
      // userStore.refreshUserInfo()
    } else {
      showFailToast({ message: res.message || '修改失败' })
    }
  } catch (error) {
    showSuccessToast({ message: '修改失败' })
  }
}
</script>

<template>
  <div class="all">
    <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="goBack" />

    <van-cell-group>
      <van-cell title="头像" is-link style="align-items: center" @click="triggerAvatarUpload">
        <template #right-icon>
          <img width="100" height="100" class="avatar" :src="userInfo.avatar" />
        </template>
        <input
          type="file"
          accept="image/*"
          @change="modifyAvatar"
          style="display: none"
          ref="avatarInputRef"
        />
      </van-cell>
      <van-cell title="昵称" :value="userInfo.nickname" is-link @click="showNickDialog = true" />
      <van-dialog
        v-model:show="showNickDialog"
        title="修改昵称"
        show-cancel-button
        @confirm="modifyNick"
      >
        <van-cell-group inset>
          <van-field
            v-model="userInfo.nickname"
            label="昵称"
            placeholder="请输入昵称"
            style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
          />
        </van-cell-group>
      </van-dialog>


      <van-cell title="手机" :value="userInfo.phone" />
      <van-cell
        title="真实姓名"
        :value="userInfo.realName"
        :is-link="userStore.isIdentified === 0"
        @click="showRealNameDialog = true && userStore.isIdentified === 0"
      />
      <van-cell
        title="身份证"
        :value="userInfo.idCard"
        :is-link="userStore.isIdentified === 0"
        @click="showRealNameDialog = true && userStore.isIdentified === 0"
      />
      <van-dialog
        v-model:show="showRealNameDialog"
        title="实名认证"
        show-cancel-button
        @confirm="handleIdentifyConfirm"
      >
        <van-cell-group inset>
          <van-field
            v-model="modifyRealname"
            label="真实姓名"
            placeholder="请输入真实姓名"
            style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
          />
          <van-field
            v-model="modifyIdNumber"
            label="身份证"
            placeholder="请输入身份证号"
            style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
          />
        </van-cell-group>
      </van-dialog>
      <van-cell title="id" :value="userInfo.id" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.all {
  background-color: #fff;
  min-height: 100vh;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.gender-radio-group {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom: 40px;
}

.gender-radio-group .van-radio {
  margin: 0 10px;
}
</style>
