<template>
  <div class="card">
    <div class="header">
      <h3>{{ props.article.title }}</h3>
    </div>
    <div class="content">
      <p class="van-multi-ellipsis--l3">{{ cleanedContent }}</p>
    </div>
    <div class="footer">
      <img :src="props.article.avatar" alt="Doctor" />
      <div class="info">
        <span>{{ props.article.name }}</span>
        &nbsp;
        <span style="color: darkgray">{{ props.article.position }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/api/article/type'
import { computed } from 'vue'
const props = defineProps<{
  article: Article
}>()
// 创建一个计算属性来处理内容，移除所有的<p>和</p>标签
const cleanedContent = computed(() => {
  return props.article!.content!.replace(/<\/?p>/g, '')
})
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 10px 20px;
}

.header h3 {
  line-height: 20px;
  padding: 25px 20px;
  padding-bottom: 15px;
  font-size: 18px;
}

.content p {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  line-height: 1.6;
}

.footer {
  display: flex;
  align-items: center;
  padding: 8px 20px;
}

.footer img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.footer .info {
  display: flex;
  font-size: 13px;
  line-height: 18px;
}
</style>
