<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { showLoadingToast, showSuccessToast } from 'vant'

const router = useRouter()
const show = ref(false)
const userInfo = ref({
  avatar:
    'https://t11.baidu.com/it/u=3118089460,219689805&fm=30&app=106&f=JPEG?w=640&h=427&s=5452578C1572739CDEA00553030080F2',
  nickname: '小茜',
  realName: '芭萨卡',
  gender: '女',
  idCard: '5586********2361',
  phone: '189****9999',
  id: '1719188345'
})

const goBack = () => {
  router.go(-1)
}
const modifyNick = () => {
  showLoadingToast({
    message: '修改中...',
    duration: 1000,
    forbidClick: true,
    onClose() {
      showSuccessToast('修改成功')

      show.value = false
    }
  })
}
</script>

<template>
  <div class="all">
    <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="goBack" />

    <van-cell-group>
      <van-cell title="头像" is-link>
        <template #right-icon>
          <img width="100" height="100" class="avatar" :src="userInfo.avatar" />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="userInfo.nickname" is-link @click="show = true" />
      <van-dialog v-model:show="show" title="修改昵称" show-cancel-button @confirm="modifyNick">
        <van-cell-group inset>
          <van-field
            v-model="userInfo.nickname"
            label="昵称"
            placeholder="请输入昵称"
            style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
          />
        </van-cell-group>
      </van-dialog>

      <van-cell title="真实姓名" :value="userInfo.realName" />
      <van-cell title="性别" :value="userInfo.gender" />
      <van-cell title="身份证" :value="userInfo.idCard" />
      <van-cell title="手机" :value="userInfo.phone" />
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
</style>
