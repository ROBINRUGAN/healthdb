<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { showDialog } from 'vant'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { useRoute } from 'vue-router'
import type { addOrdersParams } from '@/api/order/type'
import { reqAddOrder } from '@/api/order'
const loading = ref(false)
const route = useRoute()
const order = ref<addOrdersParams>()
// 当前系统时间 yyyy-mm-dd hh:mm格式
const now = new Date()
const nowStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
onMounted(() => {
  showLoadingToast({ message: '加载中...', forbidClick: true, duration: 1000 })
  const data = route.query.data
  if (!data) {
    showFailToast('未找到订单信息')
    return
  }
  order.value = JSON.parse(data as string) as addOrdersParams
})

async function pay() {
  showLoadingToast({
    message: '支付中...',
    duration: 1000,
    forbidClick: true
  })
  if (!order.value) {
    showFailToast('订单信息错误')
  }
  try {
    const res = await reqAddOrder(order.value!)
    if (res.code === 200) {
      showSuccessToast('支付成功')
      router.push('/order')
    } else {
      showFailToast(res.message || '支付失败')
    }
  } catch (error) {
    showFailToast('支付失败')
  }
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <div class="top">
        <van-nav-bar title="待支付" left-text="返回" left-arrow @click-left="router.go(-1)" />
      </div>
      <div class="all">
        <div class="amount">¥ {{ order?.money }}</div>
        <div class="content">
          <van-cell-group>
            <van-cell title="下单时间" :value="nowStr" />
            <van-cell title="服务类型" :value="order?.sname" />
            <van-cell title="就诊人" :value="order?.pname" />
            <van-cell title="预约开始时间" :value="order?.startTime" />
            <van-cell title="预约结束时间" :value="order?.endTime" />
            <van-cell title="备注" :value="order?.requirement" />
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
