<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import router from '@/router'
const animate = ref(false)
const animateIcon = ref(false)
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
onMounted(() => {
  setTimeout(() => {
    animateIcon.value = true
  }, 100) // 小延时确保页面元素已经渲染
  setTimeout(() => {
    animate.value = true
  }, 500) // 小延时确保页面元素已经渲染
})
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="back">
      <img src="@/assets/login/back.png" alt="" />
      <div class="wrapper">
        <div
          style="display: flex; justify-content: center; margin-bottom: 5px"
          :class="{ animated: animateIcon, 'hidden-initially': !animateIcon }"
        >
          <img class="logo" src="@/assets/download/logo.png" alt="" />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: start;
            "
          >
            <h1>益诊</h1>
            <h3>你的就医助理</h3>
          </div>
        </div>
        <button class="select" :class="{ animated: animate, 'hidden-initially': !animate }">
          <img src="@/assets/download/Android.svg" class="icon" alt="" />
          <span>EasyCare For Android</span>
        </button>
        <button class="select" :class="{ animated: animate, 'hidden-initially': !animate }">
          <img src="@/assets/download/iOS.svg" class="icon" alt="" />
          <span>EasyCare For iOS</span>
        </button>
        <button
          class="select-o"
          :class="{ animated: animate, 'hidden-initially': !animate }"
          @click="router.push('/home')"
        >
          <img src="@/assets/download/web.svg" class="icon" alt="" />
          <span>EasyCare On Web</span>
        </button>
      </div>
    </div>
  </van-pull-refresh>
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
  justify-content: center;
  overflow: hidden;
  align-self: center;
  text-align: center;
  align-items: center;
}
h1 {
  font-size: 40px;
  color: rgb(92, 93, 202);
  margin-bottom: 15px;
}
h3 {
  color: rgb(92, 93, 202);
  font-weight: 600;
  font-size: 16px;
}
.logo {
  width: 120px;
  margin-top: -20px;
  margin-left: -40px;
}
.select,
.select-o {
  display: flex;
  align-items: center;
  justify-content: center;
}

span {
  width: 90%;
}
.icon {
  width: 20px;
  padding: 0;
  margin: 0;
  margin-right: 10px;
}
.select {
  width: 95%;
  margin: auto;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(130, 123, 252), rgb(74, 75, 183));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
.select-o {
  margin: auto;
  width: 95%;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: rgb(110, 112, 230);
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: rgb(110, 112, 230);
  margin-bottom: 15px;
}
.select-o:active {
  background-image: linear-gradient(to top, rgb(240, 240, 240), rgb(255, 255, 255));
}
@keyframes slideUp {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated {
  animation: slideUp 1s ease-out forwards;
}
.hidden-initially {
  opacity: 0;
  transform: translateY(100px);
}
</style>
