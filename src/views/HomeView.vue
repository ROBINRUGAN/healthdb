<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import { showNotify, showSuccessToast } from 'vant'
import { RouterView, RouterLink } from 'vue-router'
import { showToast, showLoadingToast } from 'vant'
import { areaList } from '@vant/area-data'
import BarLine from '@/components/BarLine.vue'
import CardItem from '@/components/CardItem.vue'
import { useAuthStore } from '@/stores/auth'
import type { Article, ArticleResponse } from '@/api/article/type'
import { getArticleList } from '@/api/article'
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}
// TODO: 换成真实数据
const images = [
  'https://t11.baidu.com/it/u=3118089460,219689805&fm=30&app=106&f=JPEG?w=640&h=427&s=5452578C1572739CDEA00553030080F2',
  'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0512%2Ffa19bf4bj00sdclk9001ud000xc00m6m.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
]
let userStore = useAuthStore()

const showPopup = ref(false)
const areaCode = ref('350100')
const value = ref('')
const selectedCity = ref(userStore.selectedCity || '福州')

const onSearch = (val: any) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 1000,
    onOpened() {
      // router.push('/search')
      router.push({ path: 'search', query: { keyword: value.value } })
    }
  })
}
const onConfirm = (result: any) => {
  try {
    if (
      result &&
      result.selectedOptions &&
      Array.isArray(result.selectedOptions) &&
      result.selectedOptions.length > 0
    ) {
      const selectedOption = result.selectedOptions[1]
      areaCode.value = selectedOption.value
      selectedCity.value = selectedOption.text.replace(/市$/, '')
      userStore.setSelectedCity(selectedCity.value)
      userStore.setSelectedCityCode(parseInt(areaCode.value))
      showPopup.value = false
    } else {
      throw new Error('Invalid result structure')
    }
  } catch (error) {
    showNotify({ type: 'danger', message: `选择地区时出错` })
  }
}
const articleList = ref<Article[]>()
const fetchArticles = async () => {
  try {
    const res: ArticleResponse = await getArticleList()
    console.log(res)
    if (res.code === 200) {
      articleList.value = res.data
      console.log(articleList.value)
    } else {
      throw new Error(res.message || '加载失败')
    }
  } catch (error) {
    showNotify({ type: 'danger', message: '加载失败' })
  }
}
onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-notice-bar
      left-icon="volume-o"
      text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
    />
    <div class="all">
      <div class="top">
        <div style="width: 13%">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 6px;
              margin-top: 10px;
            "
          >
            <van-icon name="location-o" @click="showPopup = true" size="20px" />
            <span class="selected-city">{{ selectedCity }}</span>
          </div>
          <van-popup v-model:show="showPopup" round position="bottom">
            <van-area
              title="选择地区"
              :area-list="areaList"
              @confirm="onConfirm"
              @cancel="showPopup = false"
            />
          </van-popup>
        </div>
        <van-search
          v-model="value"
          shape="round"
          background="transparent"
          placeholder="请输入搜索关键词"
          style="width: 87%; font-size: 13px; padding: 0; padding-left: 6px"
          @search="onSearch"
        />
      </div>

      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="twobtn">
        <img class="img1" src="@/assets/home/img1.png" alt="" @click="router.push('/search')" />
        <img class="img2" src="@/assets/home/img2.png" alt="" @click="router.push('/order')" />
      </div>

      <BarLine style="width: 90%; margin: auto" />
      <CardItem
        @click="
          router.push({
            path: '/article',
            query: {
              avatar: item.avatar,
              content: item.content,
              name: item.name,
              photo: item.photo,
              position: item.position,
              title: item.title,
              createTime: item.createTime
            }
          })
        "
        v-for="(item, index) in articleList"
        :key="index"
        :article="item"
        style="width: 90%; margin-left: auto; margin-right: auto"
      />
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.my-swipe {
  height: 25vh;
  width: 90%;
  margin: auto;
  overflow: hidden;
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.top {
  display: flex;
  width: 90%;
  margin: auto;
  margin-bottom: 5px;
}
.all {
  height: 100%;
  background-image: url('@/assets/home/back.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgb(245, 240, 250);
  padding-bottom: 60px;
}
.twobtn {
  margin: auto;
  align-items: center;
  justify-content: center;
  display: flex;
}
.img1 {
  padding: 10px 5px 10px 0px;
  width: 45%;
}
.img2 {
  padding: 10px 0px 10px 5px;
  width: 45%;
}
.selected-city {
  font-size: 13px;
  margin-top: 3px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(.van-search__content--round) {
  background-color: white;
}
</style>
