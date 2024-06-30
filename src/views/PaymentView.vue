<script setup lang="ts">
import router from '@/router'
import { onMounted } from 'vue'
import { showDialog } from 'vant'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <div class="top">
        <van-nav-bar title="待支付" left-text="返回" left-arrow @click-left="router.go(-1)" />
      </div>
      <div class="all">
        <div class="amount">¥ 599.00</div>
        <div class="content">
          <van-cell-group>
            <van-cell title="下单时间" value="2024-03-01 18:20" />
            <van-cell title="服务类型" value="全程陪诊" />
            <van-cell title="就诊人" value="王李芸" />
            <van-cell title="预约开始时间" value="2024-03-04 10:00" />
            <van-cell title="预约结束时间" value="2024-03-04 18:00" />
            <van-cell title="备注" value="无" />
          </van-cell-group>
        </div>
        <button class="select" @click="pay">确认支付</button>
      </div>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.all {
  min-height: 100vh;
  padding-top: 15px;
  margin: auto;
  padding-bottom: 60px;
  background-color: rgb(245, 240, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  padding: 5px;
  background-color: white;
  border-radius: 20px;
  width: 90%;
}
.select {
  margin-top: 20px;
  width: 90%;
  padding: 15px 20px;
  font-size: 16px;
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
.amount {
  width: 90%;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  font-weight: bold;
  color: rgb(196, 3, 3);
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
