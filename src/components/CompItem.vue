<template>
  <div class="hospital-badge">
    <h4>订单号：12344213123</h4>
    <hr style="height: 1px; border: none; border-top: 1px dotted #a2a9b6; margin-bottom: 15px" />
    <div class="content">
      <p>医院：福建医科大学附属协和医院</p>
      <p>就诊人：林黄晓</p>
      <p>开始时间: {{ startTime }}</p>
      <p>结束时间: {{ endTime }}</p>
    </div>
    <button class="select" @click.prevent="getOrder">立即接单</button>
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

<script setup lang="ts">
import { showLoadingToast, showSuccessToast } from 'vant'
import { ref } from 'vue'
const active = ref(3) // 设置当前激活的步骤
const name = ref('邓新国')
const startTime = ref('2024-06-30 19:23:12')
const endTime = ref('2024-06-30 19:23:12')
function getOrder() {
  showLoadingToast({
    message: '正在接单...',
    duration: 1000,
    onClose: () => {
      showSuccessToast('接单成功')
    }
  })
}
</script>

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
