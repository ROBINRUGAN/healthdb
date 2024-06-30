<script setup lang="ts">
import { ref } from 'vue'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const overallRating = ref(0)
const processRating = ref(0)
const serviceRating = ref(0)
const comment = ref('')
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
      <van-nav-bar title="填写评价" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="all">
        <div class="starsWrapper">
          <div class="rating">
            <div class="rating-item">
              <span>总体星级</span>
              <div class="stars">
                <van-rate v-model="overallRating" />
                <span>{{ overallRating }}分</span>
              </div>
            </div>
            <div class="rating-item">
              <span>流程体验</span>
              <div class="stars">
                <van-rate v-model="processRating" />
                <span>{{ processRating }}分</span>
              </div>
            </div>
            <div class="rating-item">
              <span>服务态度</span>
              <div class="stars">
                <van-rate v-model="serviceRating" />
                <span>{{ serviceRating }}分</span>
              </div>
            </div>
          </div>
        </div>
        <div class="textWrapper">
          <van-field
            v-model="comment"
            placeholder="该医院的陪诊服务有何缺点？"
            clearable
            type="textarea"
            rows="10"
            maxlength="300"
            show-word-limit
            left-icon="edit"
          />
        </div>
        <button class="select">提交评价</button>
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
  background-image: url('@/assets/home/back.png');
  background-repeat: no-repeat;
}

.starsWrapper {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.rating {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rating-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.textWrapper {
  background-color: #fff;
  padding: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.select {
  margin-top: 20px;
  width: 100%;
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
