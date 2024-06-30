<script setup lang="ts">
import router from '@/router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <van-nav-bar title="待评价订单" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="page">
        <OrderItem
          v-for="(item, index) in 10"
          :key="index"
          @click="router.push('/commentDetail')"
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
