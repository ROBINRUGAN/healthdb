<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import CommentItem from '@/components/CommentItem.vue'
import { useRoute } from 'vue-router'
import { reqGetHospitalById } from '@/api/hosp'
import type { Hospital, HospitalResponseData } from '@/api/hosp/type'
import { useAuthStore } from '@/stores/auth'

import type { EvaluateListResponseData } from '@/api/evaluate/type'
import type { EvaluateList } from '@/api/evaluate/type'
const loading = ref(false)
const route = useRoute()
const userStore = useAuthStore()
const hospital = ref<Hospital>()
const commentList = ref<EvaluateList>()
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
  queryHospitalDetails()
}

onMounted(() => {
  showLoadingToast({ 
    message: '加载中...', forbidClick: true, duration: 1000 })
  queryHospitalDetails()
  fetchComments()
})

const fetchComments = async () => {
  const hospitalId = route.query.id as string
  if (!hospitalId) {
    showFailToast('未找到医院信息')
    return
  }
  try {
    const res: EvaluateListResponseData = await getEvaluateByHid(hospitalId)
    if (res.code === 200) {
      console.log(res.data)
      commentList.value = res.data
    } else {
      showFailToast(res.message || '加载失败')
    }
  } catch (error) {
    showFailToast('加载失败')
  }
}

const queryHospitalDetails = async () => {
  const hospitalId = route.query.id
  if (!hospitalId) {
    showFailToast('未找到医院信息')
    return
  }
  try {
    const id = parseInt(hospitalId as string)
    const res: HospitalResponseData = await reqGetHospitalById(id)
    if (res.code === 200) {
      console.log(res.data)
      hospital.value = res.data
    } else {
      showFailToast(res.message || '加载失败')
    }
  } catch (error) {
    showFailToast('加载失败')
  }
}

function getEvaluateByHid (hospitalId: string): EvaluateListResponseData | PromiseLike<EvaluateListResponseData> {
  throw new Error('Function not implemented.')
}
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <van-nav-bar title="医院详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="all">
        <h3>{{ hospital?.name }}</h3>
        <img src="@/assets/hosp/info.jpg" alt="" />
        <div class="wrapper">
          <div class="content">
            <h4>简介</h4>
            <p>
              {{ hospital?.introduction }}
            </p>
          </div>
          <div class="content">
            <h4>医院等级</h4>
            <p>{{ userStore.getHospitalLevelStr(hospital?.hospitalLevel ?? 8) }}</p>
          </div>
          <div class="content">
            <h4>医院类型</h4>
            <p>{{ hospital?.hospitalType }}</p>
          </div>
          <div class="content">
            <h4>地址</h4>
            <p>{{ hospital?.detailAddress }}</p>
          </div>
        </div>
        <button
          class="select"
          @click="router.push({ path: '/iwant', query: { hid: hospital?.id } })"
        >
          选择该医院陪诊服务
        </button>

        <div class="wrapper" style="width: 100%; margin-top: 0">
          <div class="content">
            <h4 style="margin-bottom: 15px">用户评价</h4>
            <CommentItem v-for="(item, index) in commentList" :key="index" :comment="item" />
          </div>
        </div>
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
  width: 90%;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-image: linear-gradient(to bottom, rgb(130, 123, 252), rgb(74, 75, 183));
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}
.select:active {
  background-image: linear-gradient(to top, rgb(130, 123, 252), rgb(110, 112, 230));
}
</style>
