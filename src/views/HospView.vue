<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import CommentItem from '@/components/CommentItem.vue'
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <van-nav-bar title="医院详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="all">
        <h3>福建医科大学附属协和医院</h3>
        <img src="@/assets/hosp/info.jpg" alt="" />
        <div class="wrapper">
          <div class="content">
            <h4>简介</h4>
            <p>
              由福州圣教医院与福州马高爱医院合并而成。2018年12月4日，被国家卫健委公布为首批肿瘤多学科诊疗试点医院。
            </p>
          </div>
          <div class="content">
            <h4>医院等级</h4>
            <p>三级甲等</p>
          </div>
          <div class="content">
            <h4>医院类型</h4>
            <p>综合性医院</p>
          </div>
          <div class="content">
            <h4>地址</h4>
            <p>福建省福州市新店路29号</p>
          </div>
        </div>
        <div class="wrapper" style="width: 100%; margin-top: 0">
          <div class="content">
            <h4>评价</h4>
            <CommentItem v-for="(item, index) in 5" :key="index" />
          </div>
        </div>
        <button class="select" @click="router.push('/iwant')">选择该医院陪诊服务</button>
      </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  border-radius: 20px;
  margin-top: 10px;
  height: 170px;
  width: 100%;
  object-fit: cover;
}
h3 {
  line-height: 30px;
}
h4 {
  margin-bottom: 10px;
}
.content {
  justify-content: start;
  align-self: start;
  margin: 20px 0;
}
.wrapper {
  margin: 15px 0;
  background-color: white;
  padding: 0 15px;
  border-radius: 20px;
}
.select {
  width: 80%;
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
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
</style>
