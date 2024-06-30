<template>
  <div class="review-card">
    <van-cell :title="username" :label="date" class="user-info">
      <template #icon>
        <img src="@/assets/home/mew.jpg" alt="avatar" class="avatar" />
      </template>
    </van-cell>

    <div class="ratings">
      <div class="rating-item">
        <div>总体星级</div>
        <van-rate v-model="ratings.overall" disabled />
      </div>
      <div class="rating-item">
        <div>态度满意</div>
        <van-rate v-model="ratings.attitude" disabled />
      </div>
      <div class="rating-item">
        <div>服务态度</div>
        <van-rate v-model="ratings.service" disabled />
      </div>
    </div>

    <p class="comment">特别满意，随波逐浪般心，特别感谢！</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = '用户名'
const phoneNumber = '手机号 13245367531'
const date = '2023-01-04'
const ratings = ref({
  overall: 3,
  attitude: 4,
  service: 5
})
</script>

<style scoped>
.review-card {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
img {
  margin-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-info {
  font-weight: bold;
  padding: 0;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.rating-item {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.rating-item div {
  margin-right: 8px;
}
.comment {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}
:deep(.van-rate__icon--disabled) {
  color: rgb(222, 9, 9);
}
</style>
