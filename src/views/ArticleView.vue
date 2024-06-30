<script setup lang="ts">
import { ref, reactive } from 'vue'
import router from '@/router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const doctorImage = ref(
  'https://p3.bdxiguaimg.com/img/mosaic-legacy/fe6200001eb5c02bf0e2~0x0.image'
) // 修改为实际的图片路径
const hospitalName = ref('福建医科大学附属协和医院')
const doctorName = ref('李医生')
const launchTime = ref('2024-06-30 19:30:02')
const image =
  'https://t11.baidu.com/it/u=3118089460,219689805&fm=30&app=106&f=JPEG?w=640&h=427&s=5452578C1572739CDEA00553030080F2'
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
      <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="router.go(-1)" />
      <div class="all">
        <div class="textWrapper">
          <h2>文章标题</h2>
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
            style="width: 100%; border-radius: 8px; margin-top: 15px"
          />
          <p class="content" v-for="(item, index) in 5" :key="index">
            这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文
            这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文这是文章正文。
          </p>
        </div>
      </div>
    </div>
  </van-pull-refresh>
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
