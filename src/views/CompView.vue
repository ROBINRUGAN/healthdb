<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import CompItem from '@/components/CompItem.vue'
import { Toast, showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import type {
  OrdersEscort,
  OrdersEscortList,
  OrdersEscortListResponseData
} from '@/api/escort/type'
import { useAuthStore } from '@/stores/auth'
import { getEscortOrderByStatus, getEscortOrderByUid } from '@/api/escort'
import router from '@/router'
const active = ref(4)
const queryStatus = ref(4)
const loading = ref(false)
const userStore = useAuthStore()
const currentUser = reactive(userStore.currentUser)
const orderEscortList = ref<OrdersEscortList>()
const onRefresh = () => {
  if (active.value == 0) {
    queryOrderEscortByUid()
  } else {
    queryOrderEscortByStatus()
  }
}
onMounted(() => {
  queryOrderEscortByStatus()
})

const detail = (item: OrdersEscort) => {
  console.log(item.oid)
  router.push({ path: '/helperorder', query: { data: JSON.stringify(item) } })
}
// 监听tabs的切换
watch(active, () => {
  // Toast.clear()
  if (active.value == 0) {
    queryOrderEscortByUid()
  } else {
    queryOrderEscortByStatus()
  }
})

const queryOrderEscortByStatus = () => {
  orderEscortList.value = []
  showLoadingToast({
    message: '拼命加载中...',
    forbidClick: true,
    duration: 10000,
    onOpened: async () => {
      queryStatus.value = active.value
      const data = {
        uid: currentUser.id,
        status: queryStatus.value
      }
      const res: OrdersEscortListResponseData = await getEscortOrderByStatus(data)
      console.log(res)
      if (res.code === 200) {
        orderEscortList.value = res.data
        showSuccessToast({
          message: '加载成功',
          duration: 1000,
          forbidClick: true
        })
      } else {
        showFailToast(res.message || '加载失败')
      }
    }
  })
}

// 查询陪诊师可接单列表
const queryOrderEscortByUid = () => {
  orderEscortList.value = []
  showLoadingToast({
    message: '加载可接单列表中...',
    forbidClick: true,
    duration: 10000,
    onOpened: async () => {
      queryStatus.value = active.value
      const res: OrdersEscortListResponseData = await getEscortOrderByUid(currentUser.id)
      console.log(res)
      if (res.code === 200) {
        orderEscortList.value = res.data
        showSuccessToast({
          message: '加载成功',
          duration: 1000,
          forbidClick: true
        })
      } else {
        showFailToast(res.message || '加载失败')
      }
    }
  })
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <van-tabs v-model:active="active" swipeable>
        <van-tab title="已接单" :name="4">
          <div class="page">
            <CompItem
              v-for="(item, index) in orderEscortList"
              :key="index"
              :orderEscort="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="可接单" :name="0">
          <div class="page">
            <CompItem
              v-for="(item, index) in orderEscortList"
              :key="index"
              :orderEscort="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="未开始" :name="1">
          <div class="page">
            <CompItem
              v-for="(item, index) in orderEscortList"
              :key="index"
              :orderEscort="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="进行中" :name="2">
          <div class="page">
            <CompItem
              v-for="(item, index) in orderEscortList"
              :key="index"
              :orderEscort="item"
              @click="detail(item)"
            />
          </div>
        </van-tab>
        <van-tab title="已完成" :name="3">
          <div class="page">
            <CompItem
              v-for="(item, index) in orderEscortList"
              :key="index"
              :orderEscort="item"
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
</style>
