<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { getOrderEscortStatus, type OrdersEscort } from '@/api/escort/type'
const route = useRoute()

const orderDetail = ref<OrdersEscort>()
const showPopup = ref(false)
onMounted(() => {
  if (!route.query.data) {
    showFailToast('未找到订单信息')
    return
  }

  try {
    const data = JSON.parse(route.query.data as string) as OrdersEscort
    if (!data) {
      showFailToast('未找到订单信息')
      return
    }
    orderDetail.value = data
  } catch (error) {
    showFailToast('加载失败')
  }
})
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
        <h3>{{ getOrderEscortStatus(orderDetail?.status || 4) }}</h3>
        <h5>陪诊师：{{ orderDetail?.ename }}</h5>
        <h5>2024-06-30 19:30:02</h5>
      </div>
      <div class="infoWrapper">
        <h4 style="padding: 0 16px">订单信息</h4>
        <van-cell-group>
          <van-cell title="陪诊服务类型" :value="orderDetail?.serverType" />
          <van-cell title="就诊人姓名" :value="orderDetail?.pname" />
          <van-cell title="就诊人性别" :value="orderDetail?.gender === 1 ? '男' : '女'" />
          <van-cell title="就诊人年龄" :value="orderDetail?.age" />
          <van-cell
            title="就诊人电话号码"
            :value="orderDetail?.telephoneNumber"
            is-link
            @click="handleCall(orderDetail?.telephoneNumber || '')"
          />
          <van-cell title="用户与就诊人关系" :value="orderDetail?.relationship" />
          <van-cell title="开始时间" :value="orderDetail?.startTime" />
          <van-cell title="结束时间" :value="orderDetail?.endTime" />
          <van-cell title="就诊医院" :value="orderDetail?.hname" />
          <van-cell title="订单id" :value="orderDetail?.oid" />
          <van-cell title="备注" :value="orderDetail?.requirement" />
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
          title="联系就诊人"
          :value="orderDetail?.telephoneNumber"
          is-link
          @click="handleCall(orderDetail?.telephoneNumber || '')"
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
