<script setup lang="ts">
import type { ResponseData } from '@/api/type'
import { reqDecrease, reqRecharge } from '@/api/user'
import type { RechargeParams, WithdrawParams } from '@/api/user/type'
import mewImage from '@/assets/me/patient.jpeg'
import { useAuthStore } from '@/stores/auth'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { ref, reactive, onMounted, computed } from 'vue'
const userStore = useAuthStore()
const currentUser = reactive(userStore.currentUser)
const userData = reactive({
  nickname: currentUser.nickname,
  id: currentUser.id,
  money: currentUser.money,
  avatar: currentUser.avatar,
  status: currentUser.status
})
const addNum = ref(0.0)
const dropNum = ref(0.0)
const showAdd = ref(false)
const showDrop = ref(false)
const loading = ref(false)
const identity = computed(() => {
  // userData.status
  //0为用户 1为管理员 2为陪诊师
  if (userData.status === 0) {
    return '普通用户'
  } else if (userData.status === 1) {
    return '管理员'
  } else if (userData.status === 2) {
    return '陪诊师'
  }
  return '出错了'
})
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
  userStore.refreshUserInfo()
}

// 获得用户信息
onMounted(async () => {
  userStore.refreshUserInfo()
})

const isValidAmount = (amount: any) => {
  const pattern = /^\d+(\.\d{1,2})?$/ // 正则表达式，匹配合法金额
  return pattern.test(amount)
}

const addMoney = async () => {
  if (!isValidAmount(addNum.value)) {
    showFailToast('请输入合法的金额')
    return
  }
  showLoadingToast({
    message: '修改中...',
    duration: 2000,
    forbidClick: true
  })
  try {
    const amount = Number(addNum.value)
    const data: RechargeParams = {
      id: userData.id,
      money: amount
    }
    const res: ResponseData = await reqRecharge(data)
    if (res.code === 200) {
      showSuccessToast('成功充值' + amount + '元～')
      userData.money += amount
      currentUser.money += amount
      showAdd.value = false
    } else {
      showFailToast(res.message || '充值失败')
    }
  } catch (error) {
    showFailToast('充值失败')
  }
}
const dropMoney = async () => {
  if (!isValidAmount(dropNum.value)) {
    showFailToast('请输入合法的金额')
    return
  }
  const amount = Number(dropNum.value)
  if (amount > userData.money) {
    showFailToast('余额不足，无法提现')
    return
  }
  showLoadingToast({
    message: '修改中...',
    duration: 1000,
    forbidClick: true
    // onClose() {
    //   showSuccessToast('成功提现' + amount + '元～')
    //   userData.money -= amount
    //   showDrop.value = false
    // }
  })
  try {
    const data: WithdrawParams = {
      id: userData.id,
      money: amount
    }
    const res: ResponseData = await reqDecrease(data)
    if (res.code === 200) {
      showSuccessToast('成功提现' + amount + '元～')
      userData.money -= amount
      currentUser.money -= amount
      showDrop.value = false
    } else {
      showFailToast(res.message || '提现失败')
    }
  } catch (error) {
    showFailToast('提现失败')
  }
}
const joinQQGroup = () => {
  // 替换为你的 QQ 群链接
  window.location.href = 'https://qm.qq.com/q/mHztyowGiY'
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <div class="top">
        <van-image round width="80px" height="80px" :src="userData.avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="info">
          <div style="display: flex; align-items: center">
            <h3 style="margin-right: 5px; margin-top: 2px">{{ userData.nickname }}</h3>
            <van-tag
              color="#7232dd"
              style="font-size: 10px; padding: 3px 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)"
              round
              size="large"
              v-if="userStore.isCompanion"
              >{{ identity }}</van-tag
            >
          </div>
          <h5>id: {{ userData.id }}</h5>
        </div>
      </div>
      <div class="twoWrapper">
        <div class="wrapper">
          <h4>用户余额（元）</h4>
          <h1>{{ userData.money }}</h1>
        </div>
        <div class="btns">
          <button class="btn1" @click="showAdd = true">充值</button>
          <van-dialog v-model:show="showAdd" title="充值" show-cancel-button @confirm="addMoney">
            <van-cell-group inset>
              <van-field
                v-model="addNum"
                label="充值金额"
                required
                type="number"
                placeholder="最多两位小数"
                style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
              />
            </van-cell-group>
          </van-dialog>
          <button class="btn2" @click="showDrop = true">提现</button>
          <van-dialog v-model:show="showDrop" title="提现" show-cancel-button @confirm="dropMoney">
            <van-cell-group inset>
              <van-field
                type="number"
                v-model="dropNum"
                required
                label="提现金额"
                placeholder="最多两位小数"
                style="border-radius: 10px; margin: 15px 0 25px 0; border: 1px solid #000"
              />
            </van-cell-group>
          </van-dialog>
        </div>
      </div>

      <van-cell-group class="group">
        <van-cell class="groupItem" icon="records-o" title="待评价" is-link to="/comment" />
        <van-cell class="groupItem" icon="user-o" title="个人信息" is-link to="userinfo" />
        <van-cell
          class="groupItem"
          icon="friends-o"
          title="就诊人管理"
          is-link
          to="/patients"
          @click="userStore.queryPatients()"
        />
        <van-cell class="groupItem" icon="chat-o" title="意见反馈" is-link @click="joinQQGroup" />
      </van-cell-group>
      <button v-if="userStore.token" class="select-o" @click="userStore.logout">退出登录</button>
      <button v-if="userStore.token == ''" class="select" @click="userStore.logout">去登录</button>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.top {
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  display: flex;
  align-items: center;
  background-image: url('@/assets/home/back.png');
  padding-bottom: 60px;
}
.info {
  margin-left: 20px;
}
h5 {
  margin-top: 5px;
  font-weight: 600;
}
.wrapper {
  align-self: center;
}
.twoWrapper {
  z-index: 100;
  width: 90%;
  margin: auto;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(253, 238, 172, 1) 0%,
    rgba(254, 250, 131, 1) 0%,
    rgba(252, 202, 0, 1) 100%
  );
  margin-top: -45px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
h1 {
  color: white;
  margin-top: 10px;
  font-size: 40px;
  margin-left: -5px;
}
.btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}
.btn1 {
  border-radius: 20px;
  border: none;
  background: linear-gradient(180deg, rgba(108, 229, 242, 1) 0%, rgba(52, 179, 221, 1) 99%);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  padding: 10px 20px;
}
.btn1:active {
  background: linear-gradient(180deg, rgba(52, 179, 221, 1) 0%, rgba(108, 229, 242, 1) 99%);
}
.btn2 {
  border-radius: 20px;
  border: none;
  background: linear-gradient(180deg, rgba(170, 142, 242, 1) 0%, rgba(54, 52, 203, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 10px;
}
.btn2:active {
  background: linear-gradient(180deg, rgba(54, 52, 203, 1) 0%, rgba(170, 142, 242, 1) 100%);
}
.group {
  width: 90%;
  margin: auto;
  margin-top: 10px;
}
.groupItem {
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  border-radius: 10px;
}
.select-o {
  width: 80%;
  margin-left: 10%;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(255, 55, 55), rgb(177, 21, 21));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.select-o:active {
  background-image: linear-gradient(to top, rgb(255, 55, 55), rgb(177, 21, 21));
}
.select {
  width: 80%;
  margin-left: 10%;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(130, 123, 252), rgb(74, 75, 183));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
</style>
