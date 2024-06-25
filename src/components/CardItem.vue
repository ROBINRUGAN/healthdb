<template>
  <div class="card">
    <div class="header">
      <h3>精彩病例人脸医学开发</h3>
    </div>
    <div class="content">
      <p>精彩病例奖励推荐和病历开发，围绕主题展开探讨，可能影响他疗法制。</p>
    </div>
    <div class="footer">
      <img :src="doctorImage" alt="Doctor" />
      <div class="info">
        <span>{{ doctorName }}</span>
        &nbsp;
        <span style="color: darkgray">{{ hospitalName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const doctorImage = ref(
  'https://p3.bdxiguaimg.com/img/mosaic-legacy/fe6200001eb5c02bf0e2~0x0.image'
) // 修改为实际的图片路径
const hospitalName = ref('福建医科大学附属协和医院')
const doctorName = ref('李医生')
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
