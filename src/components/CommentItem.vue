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
        <van-rate v-model="ratings.star" disabled />
      </div>
      <div class="rating-item">
        <div>整体流程</div>
        <van-rate v-model="ratings.process" disabled />
      </div>
      <div class="rating-item">
        <div>服务态度</div>
        <van-rate v-model="ratings.server" disabled />
      </div>
    </div>

    <p class="comment">{{ props.comment.content }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Evaluate } from '@/api/evaluate/type'
import { ref } from 'vue'

const props = defineProps<{
  comment: Evaluate
}>()

const username = props.comment.nickname
const date = props.comment.createTime
const ratings = ref({
  server: props.comment.serverLevel,
  process: props.comment.processLevel,
  star: props.comment.starLevel
})
// function formatDate(isoString: string): string {
//   const date = new Date(isoString)
//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   const hours = String(date.getHours()).padStart(2, '0')
//   const minutes = String(date.getMinutes()).padStart(2, '0')
//   const seconds = String(date.getSeconds()).padStart(2, '0')

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
// }
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
