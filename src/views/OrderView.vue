<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import OrderItem from '@/components/OrderItem.vue'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { reqQueryOrderByStatus, reqQueryOrderMultiple } from '@/api/order'
import type { Order, OrderList, OrderListResponse, OrderListSearchParams } from '@/api/order/type'
const active = ref(4)
const showPopup = ref(false)
const showDatePicker = ref(false)
const dateResult = ref('')
const value = ref('')
const address = ref('')
const loading = ref(false)
const queryStatus = ref(4)
const userStore = useAuthStore()
const currentUser = reactive(userStore.currentUser)
const orderList = ref<OrderList>()
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
  queryOrderByStatus()
}
onMounted(() => {
  queryOrderByStatus()
})
const onSearch = (val: any) => {
  const data: OrderListSearchParams = {
    uid: currentUser.id,
    name: val === '' ? undefined : val,
    startTime: dateResult.value ? dateResult.value : undefined,
    status: queryStatus.value
  }
  queryByMultiple(data)
}
//设置成本地时间
const currentDate = ref([
  new Date().getFullYear().toString(),
  (new Date().getMonth() + 1).toString(),
  new Date().getDate().toString()
])
const currentTime = ref([new Date().getHours().toString(), new Date().getMinutes().toString()])

const onDateConfirm = () => {
  // showSuccessToast(`${currentDate.value.join('/')} ${currentTime.value.join(':')}`)
  dateResult.value = `${currentDate.value.join('-')} ${currentTime.value.join(':')}` + ':00'
  showDatePicker.value = false
  const data: OrderListSearchParams = {
    uid: currentUser.id,
    startTime: dateResult.value,
    status: queryStatus.value
  }
  queryByMultiple(data)
}

const onConfirm = (result: any) => {
  address.value = result.selectedOptions.map((option: { text: string }) => option.text).join(' ')
  showPopup.value = false
}

const queryByMultiple = async (data: OrderListSearchParams) => {
  orderList.value = []
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 2000,
    onOpened: async () => {
      const res: OrderListResponse = await reqQueryOrderMultiple(data)
      if (res.code === 200) {
        orderList.value = res.data
        showSuccessToast('加载成功')
      } else {
        showFailToast(res.message || '加载失败')
      }
    }
  })
}

// 根据订单状态查询
const queryOrderByStatus = async () => {
  queryByMultiple({
    uid: currentUser.id,
    status: queryStatus.value
  })
}
// 监听tabs的切换
watch(active, () => {
  queryStatus.value = active.value
  queryOrderByStatus()
})

const detail = (item: Order) => {
  console.log(item.oid)
  router.push({ path: '/orderDetail', query: { id: item.oid as number } })
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <van-search
        v-model="value"
        round
        placeholder="请输入搜索关键词"
        background="white"
        style="
          font-size: 14px;
          padding: 0;
          border-radius: 10px;
          height: 40px;
          background-color: white;
        "
        @search="onSearch"
      />

      <van-field
        style="margin-top: 10px"
        v-model="dateResult"
        is-link
        readonly
        class="filter"
        name="datePicker"
        label="开始时间"
        placeholder="点击选择时间"
        @click="showDatePicker = true"
      />

      <van-popup round v-model:show="showDatePicker" position="bottom">
        <van-picker-group
          title="开始日期"
          :tabs="['选择日期', '选择时间']"
          @confirm="onDateConfirm"
          @cancel="showDatePicker = false"
        >
          <van-date-picker v-model="currentDate" />
          <van-time-picker v-model="currentTime" />
        </van-picker-group>
      </van-popup>

      <van-tabs v-model:active="active" swipeable>
        <van-tab title="全部" :name="4">
          <div class="page">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :order="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="已下单" :name="0">
          <div class="page">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :order="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="已接单" :name="1">
          <div class="page">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :order="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="进行中" :name="2">
          <div class="page">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :order="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="已完成" :name="3">
          <div class="page">
            <OrderItem
              v-for="(item, index) in orderList"
              :key="index"
              :order="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.all {
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 15px;
  margin: auto;
  padding-bottom: 60px;
  background-color: rgb(245, 240, 250);
}
.page {
  min-height: 100vh;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 1px;
}
:deep(.van-tabs__nav--line) {
  border-radius: 10px;
}
:deep(.van-tabs__content--animated, .van-tabs__track) {
  border-radius: 10px;
}
.filter {
  border-radius: 10px;
  margin-bottom: 10px;
}
:deep(.van-search__content) {
  background-color: transparent;
}
</style>
