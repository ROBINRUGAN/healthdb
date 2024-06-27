<script setup lang="ts">
import router from '@/router'
</script>
<template>
  <div class="all">
    <van-nav-bar title="待评价订单" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="page">
      <OrderItem v-for="(item, index) in 10" :key="index" @click="router.push('/commentDetail')" />
    </div>
  </div>
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
