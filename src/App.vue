<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-view />

  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="notes-o">我的订单</van-tabbar-item>
    <van-tabbar-item replace to="/join" icon="smile-o">成为陪诊</van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
