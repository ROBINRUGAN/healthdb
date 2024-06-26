<script setup lang="ts">
import HospItem from '@/components/HospItem.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
// 确保value始终为字符串类型，如果route.query.keyword是数组或未定义，则默认为空字符串
const value = ref(typeof route.query.keyword === 'string' ? route.query.keyword : '')
function detail(item: any) {
  router.push('/hospital')
}
</script>
<template>
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
</template>
<style scoped>
.all {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 15px;
  margin: auto;
  padding-bottom: 60px;
  background-color: rgb(245, 240, 250);
}
</style>
