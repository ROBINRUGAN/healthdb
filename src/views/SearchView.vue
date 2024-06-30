<script setup lang="ts">
import HospItem from '@/components/HospItem.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import router from '@/router'
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}

const route = useRoute()
// 确保value始终为字符串类型，如果route.query.keyword是数组或未定义，则默认为空字符串
const value = ref(typeof route.query.keyword === 'string' ? route.query.keyword : '')
function detail(item: any) {
  router.push('/hospital')
}
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-nav-bar title="搜索详情" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="all">
      <van-search
        v-model="value"
        shape="round"
        background="transparent"
        placeholder="请输入搜索关键词"
        style="font-size: 13px; padding: 0; padding-left: 6px"
      />
      <HospItem v-for="(item, index) in 5" :key="index" @click="detail(item)" />
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
}
</style>
