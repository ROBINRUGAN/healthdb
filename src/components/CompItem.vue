<script setup lang="ts">
import type { OrdersEscort } from '@/api/escort/type'
import { reqAddOrderEscort } from '@/api/order'
import type { addOrdersEscortParams } from '@/api/order/type'
import type { ResponseData } from '@/api/type'
import { useAuthStore } from '@/stores/auth'
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { onMounted, reactive, ref } from 'vue'
const active = ref(1) // 设置当前激活的步骤
const enableGetOrder = ref(true)
const userStore = useAuthStore()
const currentUser = reactive(userStore.currentUser)
const props = defineProps<{
  orderEscort: OrdersEscort
}>()
async function getOrder() {
  showLoadingToast({
    message: '正在接单...',
    duration: 1000
  })
  // 判断是否可以接单
  if (props.orderEscort.status !== 0) {
    showFailToast('订单已被接单')
    return
  }
  if (!props.orderEscort.oid) {
    showFailToast('未找到订单信息')
    return
  }
  // 接单
  const data: addOrdersEscortParams = {
    oid: props.orderEscort.oid,
    uid: currentUser.id
  }
  const res: ResponseData = await reqAddOrderEscort(data)
  if (res.code === 200) {
    showSuccessToast('接单成功')
    active.value = 1
    enableGetOrder.value = false
  } else {
    showFailToast(res.message || '接单失败')
  }
}

onMounted(() => {
  active.value = props.orderEscort.status as number
  enableGetOrder.value = props.orderEscort.status === 0
})
</script>

<template>
  <div class="hospital-badge">
    <h4>订单号：{{ orderEscort.oid }}</h4>
    <hr style="height: 1px; border: none; border-top: 1px dotted #a2a9b6; margin-bottom: 15px" />
    <div class="content">
      <p>服务类型：{{ orderEscort.serverType }}</p>
      <p>医院：{{ orderEscort.hname }}</p>
      <p>就诊人：{{ orderEscort.pname }}</p>
      <p>开始时间: {{ orderEscort.startTime }}</p>
      <p>结束时间: {{ orderEscort.endTime }}</p>
    </div>
    <button class="select" @click.prevent="getOrder" v-if="enableGetOrder">立即接单</button>
    <van-steps :active="active" direction="horizontal" active-color="#E99D42" class="steps">
      <van-step>
        <template #finish-icon>
          <van-icon name="description" color="#E99D42" style="margin-left: 10px" />
        </template>
        <template #active-icon>
          <van-icon name="description" color="#E99D42" style="margin-left: 10px" />
        </template>
        <template #inactive-icon>
          <van-icon name="description" style="margin-left: 10px" />
        </template>
        已下单
      </van-step>
      <van-step>
        <template #finish-icon>
          <van-icon name="service-o" color="#E99D42" style="margin-left: -3px" />
        </template>
        <template #active-icon>
          <van-icon name="service-o" color="#E99D42" style="margin-left: -3px" />
        </template>
        <template #inactive-icon>
          <van-icon name="service-o" style="margin-left: -3px" />
        </template>
        已接单
      </van-step>
      <van-step>
        <template #finish-icon>
          <van-icon name="clock-o" color="#E99D42" style="margin-left: -3px"
        /></template>
        <template #active-icon>
          <van-icon name="clock-o" color="#E99D42" style="margin-left: -3px"
        /></template>
        <template #inactive-icon> <van-icon name="clock-o" style="margin-left: -3px" /></template>
        进行中
      </van-step>
      <van-step>
        <template #finish-icon>
          <van-icon name="clock-o" color="#E99D42" style="margin-right: 10px" />
        </template>
        <template #active-icon>
          <van-icon name="clock-o" color="#E99D42" style="margin-right: 10px" />
        </template>
        <template #inactive-icon>
          <van-icon name="completed" style="margin-right: 10px" />
        </template>
        已完成
      </van-step>
    </van-steps>
  </div>
</template>

<style scoped>
.hospital-badge {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 10px 0px;
  color: black;
}

.badge-content p {
  margin: 5px 0;
  font-size: 13px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  margin-left: 20px;
  width: 80%;
  line-height: 16px;
}
.content p {
  padding-bottom: 10px;
  font-size: 14px;
}

h4 {
  font-size: 14px;
  font-weight: normal;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.steps {
  width: 92%;
  margin: auto;
  margin-top: -10px;
  margin-bottom: 20px;
}
.select {
  width: 90%;
  /* margin: auto; */
  margin-left: 5%;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(130, 123, 252), rgb(74, 75, 183));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
</style>
