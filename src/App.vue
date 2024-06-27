<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { watch, ref } from 'vue'
</script>

<template>
  <transition name="van-fade">
    <router-view />
  </transition>

  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="notes-o">我的订单</van-tabbar-item>
    <!-- 这里要二选一掉 -->
    <van-tabbar-item replace to="/join" icon="smile-o">成为陪诊</van-tabbar-item>
    <van-tabbar-item replace to="/company" icon="smile-o">陪诊客户</van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.van-tabbar--fixed {
  border-radius: 10px 10px 0 0 !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
}
.van-tabbar-item {
  border-radius: 10px !important;
}
.van-hairline--top-bottom:after,
.van-hairline-unset--top-bottom:after {
  border: none !important;
}
</style>
