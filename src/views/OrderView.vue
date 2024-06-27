<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import OrderItem from '@/components/OrderItem.vue'
const active = ref(0)
</script>

<template>
  <div class="all">
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="全部" name="a">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 10" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="未付款" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 2" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="未开始" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 5" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="进行中" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 2" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="已完成" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 1" :key="index" />
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
  </div>
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
