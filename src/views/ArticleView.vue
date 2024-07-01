<script setup lang="ts">
import { ref, reactive } from 'vue'
import router from '@/router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { useRoute } from 'vue-router'
const route = useRoute()
// 使用 ref 解构来响应式地获取路由参数

const doctorImage = ref(route.query.avatar as string)
const hospitalName = ref(route.query.position as string)
const doctorName = ref(route.query.name as string)
const launchTime = ref(route.query.createTime as string)
const image = ref(route.query.photo as string)
const loading = ref(false)
const onRefresh = () => {
  console.log(route.query)
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
</script>
<template>
  <div>
    <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="router.go(-1)" />
    <div class="all">
      <div class="textWrapper">
        <h2>{{ route.query.title }}</h2>
        <div class="footer">
          <img :src="doctorImage" alt="Doctor" />
          <div class="info">
            <span>{{ doctorName }}</span>
            &nbsp;
            <span style="color: darkgray">{{ hospitalName }}</span>
          </div>
        </div>
        <div class="launchTime">发布时间：{{ launchTime }}</div>
        <van-image
          :src="image"
          alt="图片加载失败"
          round
          fit="contain"
          style="width: 100%; border-radius: 8px; margin-top: 15px; overflow: hidden"
        />
        <div class="content" v-html="route.query.content"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.all {
  background-color: rgb(245, 240, 250);
  min-height: 100vh;
  padding: 16px;
  padding-top: 20px;
  padding-bottom: 60px;
  background-image: url('@/assets/home/back.png');
  background-repeat: no-repeat;
}
.textWrapper {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.content {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-top: 10px;
  text-indent: 2em;
  white-space: pre-line; /* This will respect new lines in the content */
}
.footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
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
.launchTime {
  font-size: 12px;
  color: #999;
  margin-top: 15px;
}
</style>
