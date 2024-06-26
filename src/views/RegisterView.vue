<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import { showLoadingToast } from 'vant'

const phone = ref('')
const password = ref('')
const register = () => {
  showLoadingToast({
    message: '正在注册...',
    forbidClick: true,
    duration: 1000,
    onClose() {
      router.push('/home')
    }
  })
}
</script>

<template>
  <div class="back">
    <img src="@/assets/login/back.png" alt="" />
    <div class="wrapper">
      <h1>注册</h1>
      <van-cell-group inset class="phone">
        <van-field
          v-model="phone"
          label="手机号"
          type="tel"
          placeholder="请输入手机号"
          label-align="left"
          input-align="left"
        />
      </van-cell-group>
      <van-cell-group inset class="password">
        <van-field
          v-model="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          label-align="left"
          input-align="left"
        />
      </van-cell-group>
      <button class="login" @click="register">注册并登录</button>
      <div class="change">
        <span>已有账号？</span>
        <span @click="router.push('/login')" style="color: rgb(71, 73, 186); font-weight: bold"
          >去登录！</span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.back {
  width: 100%;
  line-height: 20px;
  background: linear-gradient(180deg, rgba(71, 73, 186, 1) 0%, rgba(170, 142, 242, 1) 73%);
  color: rgba(16, 16, 16, 1);
  z-index: 40;
  flex-direction: column;
  display: flex;
  align-items: center;
  position: relative;
}
img {
  padding: 10px;
  width: 250px;

  z-index: 0;
}
.wrapper {
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px 40px 0 0;
  z-index: 100;

  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  color: rgb(92, 93, 202);
  margin-bottom: 20px;
}
.password,
.phone {
  width: 90%;
  margin-top: 10px;
  border-radius: 20px;
  border-bottom: 1px solid rgb(132, 48, 183);
}
.login {
  margin-top: 20px;
  width: 90%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(130, 123, 252), rgb(96, 98, 222));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.login:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
:deep(.van-field__label) {
  width: 50px !important;
}
.change {
  margin-top: 20px;
  font-size: 16px;
  color: gray;
}
</style>
