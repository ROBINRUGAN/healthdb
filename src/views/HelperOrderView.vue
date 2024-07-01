<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const overallRating = ref(0)
const processRating = ref(0)
const serviceRating = ref(0)
const comment = ref('')
const showHelperInfo = ref(false)
const orderInfo = ref({
  serviceType: '协助挂号',
  patientName: '王李芸',
  gender: '女',
  age: '58周岁',
  phone: '134****2361',
  relationship: '本人',
  startTime: '2024/03/01 08:40',
  endTime: '2024/03/01 19:30',
  hospital: '福建医科大学附属协和医院',
  orderId: '1532478569008',
  remark: '无'
})

const showPopup = ref(false)

const handleContactClick = () => {
  showPopup.value = true
}

const handleCall = (phone: string) => {
  showLoadingToast('加载中...')
  window.location.href = `tel:${phone}`
}
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="all">
      <div class="ordersWrapper">
        <h3>已接单</h3>
        <h5>陪诊师：林黄晓</h5>
        <h5>2024-06-30 19:30:02</h5>
      </div>
      <div class="infoWrapper">
        <h4 style="padding: 0 16px">订单信息</h4>
        <van-cell-group>
          <van-cell title="陪诊服务类型" :value="orderInfo.serviceType" />
          <van-cell title="就诊人姓名" :value="orderInfo.patientName" />
          <van-cell title="性别" :value="orderInfo.gender" />
          <van-cell title="年龄" :value="orderInfo.age" />
          <van-cell title="电话号码" :value="orderInfo.phone" />
          <van-cell title="用户与就诊人关系" :value="orderInfo.relationship" />
          <van-cell title="开始时间" :value="orderInfo.startTime" />
          <van-cell title="结束时间" :value="orderInfo.endTime" />
          <van-cell title="就诊医院" :value="orderInfo.hospital" />
          <van-cell title="订单id" :value="orderInfo.orderId" />
          <van-cell title="备注" :value="orderInfo.remark" />
        </van-cell-group>
        <div class="amount">¥599.00</div>
      </div>
      <div class="textWrapper">
        <div class="contact" @click="handleContactClick">
          <h4>遇到问题</h4>
          <div style="display: flex">
            <p
              style="
                font-size: 14px;
                color: rgb(100, 100, 100);
                align-self: center;
                margin-right: 3px;
              "
            >
              联系我们
            </p>
            <van-icon name="phone-o" size="20" />
          </div>
        </div>

        <p class="puzzle">对订单有疑问？</p>
      </div>
      <button class="select" @click="router.push('/commentdetail')">提交评价</button>
    </div>

    <van-popup v-model:show="showPopup" position="bottom" name="联系我们" round closeable>
      <h3 style="text-align: center; margin-top: 20px; margin-bottom: 20px">联系我们</h3>
      <van-cell-group>
        <van-cell
          readonly
          title="联系陪诊师"
          value="1234567890"
          is-link
          @click="handleCall('1234567890')"
        />
        <van-cell
          readonly
          title="联系总部"
          value="0987654321"
          is-link
          @click="handleCall('0987654321')"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<style scoped>
.all {
  background-color: rgb(245, 240, 250);
  min-height: 100vh;
  padding: 16px;
  padding-top: 20px;
  padding-bottom: 60px;
  background-image: url('@/assets/home/back.png');
  background-repeat: no-repeat;
}

.ordersWrapper {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}
.infoWrapper {
  background-color: #fff;
  padding: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.textWrapper {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
h5 {
  font-weight: normal;
  margin-top: 8px;
}
h4 {
  margin-bottom: 10px;
}
.select {
  margin-top: 10px;
  width: 100%;
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
.puzzle {
  font-size: 12px;
  background-color: rgba(248, 248, 248, 1);
  color: rgba(108, 108, 108, 1);
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
}
.contact {
  display: flex;
  justify-content: space-between;
  align-items: start;
  cursor: pointer;
}
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
.amount {
  color: rgb(185, 1, 1);
  font-size: 28px;
  text-align: end;
  margin-right: 20px;
}
</style>
