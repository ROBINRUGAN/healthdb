<script setup lang="ts">
import router from '@/router'
import { onMounted, reactive, ref } from 'vue'
import { showLoadingToast, showSuccessToast } from 'vant'
import HaveCommentedOrder from '@/components/HaveCommentedOrder.vue'
import { useAuthStore } from '@/stores/auth'
const loading = ref(false)
const userStore = useAuthStore()
const currentUser = reactive(userStore.currentUser)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
onMounted(async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 1000,
    onOpened: async () => {
      userStore.queryCommentedOrderList()
    }
  })
})
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <van-nav-bar title="已评价订单" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="page">
        <HaveCommentedOrder
          v-for="(item, index) in userStore.commentedOrderList"
          :key="index"
          :order="item"
          @click="router.push({ path: '/haveCommentedDetail', query: { id: item.oid } })"
        />
      </div>
    </div>
  </van-pull-refresh>
</template>
<style scoped>
.all {
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: rgb(245, 240, 250);
}
.page {
  width: 90%;
  margin: auto;
  min-height: 100vh;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 1px;
}
</style>
