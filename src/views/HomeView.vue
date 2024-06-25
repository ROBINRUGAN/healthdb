<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { showToast } from 'vant'
import { areaList } from '@vant/area-data'
import BarLine from '@/components/BarLine.vue'
import CardItem from '@/components/CardItem.vue'
const images = [
  'https://t11.baidu.com/it/u=3118089460,219689805&fm=30&app=106&f=JPEG?w=640&h=427&s=5452578C1572739CDEA00553030080F2',
  'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0512%2Ffa19bf4bj00sdclk9001ud000xc00m6m.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
]
const showPopup = ref(false)
const areaCode = ref('')
const value = ref('')
const onSearch = (val: any) => showToast(val)
const onCancel = () => showToast('取消')

const onConfirm = (result: any) => {
  console.log('Selected area:', result)
  showPopup.value = false // Optionally close the popup after selection
}
</script>

<template>
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
          <span style="font-size: 13px; margin-top: 3px">福州</span>
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
        background="#F8F9FD"
        placeholder="请输入搜索关键词"
        style="width: 87%; font-size: 13px; padding: 0; padding-left: 6px"
      />
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <div class="twobtn">
      <img class="img1" src="@/assets/home/img1.png" alt="" />
      <img class="img2" src="@/assets/home/img2.png" alt="" />
    </div>

    <BarLine style="width: 90%; margin: auto" />
    <CardItem
      v-for="(item, index) in 5"
      :key="index"
      style="width: 90%; margin-left: auto; margin-right: auto"
    />
  </div>
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
  background-color: #f8f9fd;
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
:deep(.van-search__content--round) {
  background-color: white;
}
</style>
