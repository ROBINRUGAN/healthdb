<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { getOrderStatus, type Order, type OrderDetail } from '@/api/order/type'
import { reqQueryOrderById } from '@/api/order'
import type { Escort, EscortResponseData } from '@/api/escort/type'
import { getEscortById } from '@/api/escort'
import { useAuthStore } from '@/stores/auth'
const route = useRoute()
const userStore = useAuthStore()
const order = ref<Order>()
const showHelperInfo = ref(false)
const escort = ref<Escort>()
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
  queryOrderDetails()
}
onMounted(() => {
  queryOrderDetails()
})

const queryOrderDetails = async () => {
  showLoadingToast({ message: '加载中...', forbidClick: true, duration: 1000 })
  const data = route.query.id
  if (!data) {
    showFailToast('未找到订单信息')
    return
  }
  try {
    const id = parseInt(data as string)
    const res: OrderDetail = await reqQueryOrderById(id)
    if (res.code === 200) {
      order.value = res.data
      console.log(order.value)
    } else {
      showFailToast(res.message || '加载失败')
    }
  } catch (error) {
    showFailToast('加载失败')
  }
}

// 查询陪诊师信息
const queryEscortInfo = async () => {
  showLoadingToast({ message: '加载中...', forbidClick: true, duration: 1000 })
  console.log(order.value?.eid)
  // 如果没有陪诊师id，直接返回
  if (!order.value?.eid) {
    showFailToast('无陪诊师信息')
    return
  }
  try {
    const res: EscortResponseData = await getEscortById(order.value?.eid as number)
    if (res.code === 200) {
      console.log(res)
      escort.value = res.data
      showHelperInfo.value = true
    } else {
      showFailToast(res.message || '加载失败')
    }
  } catch (error) {
    showFailToast('加载失败')
  }
}
const checkIfOrderCommented = (orderId: number) => {
  return userStore.commentedOrderList.some((order) => order.oid === orderId)
}

const clickToComment = async () => {
  const orderId = order.value?.oid
  if (!orderId) {
    console.error('订单ID不存在')
    return
  }
  // 先查询是否已经评价
  if (userStore.commentedOrderList.length === 0) {
    // 先查
    await userStore.queryCommentedOrderList()
  }
  if (checkIfOrderCommented(orderId)) {
    showFailToast('您已经评价过了')
  } else {
    router.push({ path: '/commentdetail', query: { id: orderId } })
  }
}
</script>

<template>
  <div>
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="all">
      <div class="ordersWrapper">
        <h3>{{ getOrderStatus(order?.status ?? 4) }}</h3>
        <h5>陪诊师：{{ order?.ename || '未有陪诊师接单' }}</h5>
        <h5>{{ order?.updateTime }}</h5>
        <button class="select" style="margin-top: 20px; padding: 10px 0" @click="queryEscortInfo()">
          查看陪诊师详细信息
        </button>
        <van-action-sheet v-model:show="showHelperInfo" title="陪诊师信息">
          <van-cell-group>
            <van-cell title="姓名" :value="escort?.ename" />
            <van-cell title="性别" :value="escort?.gender === 1 ? '男' : '女'" />
            <van-cell title="年龄" :value="escort?.age" />
            <van-cell
              title="电话号码"
              :value="escort?.telephone"
              is-link
              @click="handleCall(escort?.telephone || '18005471144')"
            />
            <van-cell title="是否为医护工作者" :value="escort?.isMedicalWorker ? '是' : '否'" />
            <van-cell title="工作部门" :value="escort?.workSection" />
          </van-cell-group>
        </van-action-sheet>
      </div>
      <div class="infoWrapper">
        <h4 style="padding: 0 16px">订单信息</h4>
        <van-cell-group>
          <van-cell title="陪诊服务类型" :value="order?.serverType" />
          <van-cell title="就诊人姓名" :value="order?.pname" />
          <van-cell title="就诊人性别" :value="order?.gender === 1 ? '男' : '女'" />
          <van-cell title="就诊人年龄" :value="order?.age" />
          <van-cell title="就诊人电话号码" :value="order?.telephoneNumber" />
          <van-cell title="您与就诊人关系" :value="order?.relationship" />
          <van-cell title="开始时间" :value="order?.startTime" />
          <van-cell title="结束时间" :value="order?.endTime" />
          <van-cell title="就诊医院" :value="order?.pname" />
          <van-cell title="订单id" :value="order?.oid" />
          <van-cell title="备注" :value="order?.requirement" />
        </van-cell-group>
        <div class="amount">¥ {{ order?.money }}</div>
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
      <button class="select" @click="clickToComment()" v-if="order?.status === 3">提交评价</button>
    </div>

    <van-popup v-model:show="showPopup" position="bottom" name="联系我们" round closeable>
      <h3 style="text-align: center; margin-top: 20px; margin-bottom: 20px">联系我们</h3>
      <van-cell-group>
        <!-- <van-cell
          readonly
          title="联系陪诊师"
          value="1234567890"
          is-link
          @click="handleCall('1234567890')"
        /> -->
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
