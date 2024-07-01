<script setup lang="ts">
import type { Order } from '@/api/order/type'
import { onMounted, ref } from 'vue'
const active = ref(3) // 设置当前激活的步骤
const name = ref('邓新国')
const time = ref('2024-06-30 19:23:12')

const props = defineProps<{
  order: Order
}>()
onMounted(() => {
  active.value = props.order.status
})
</script>



<template>
  <div class="hospital-badge">
    <h4>订单号：{{ order.oid }}</h4>
    <hr style="height: 1px; border: none; border-top: 1px dotted #a2a9b6; margin-bottom: 15px" />
    <div class="content">
      <p>医院：{{ order.hname }}</p>
      <p>价格：{{ order.money }} 元 </p>
      <p>预约时间: {{ order.startTime }}</p>
    </div>
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
</style>
