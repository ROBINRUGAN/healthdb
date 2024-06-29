<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import OrderItem from '@/components/OrderItem.vue'
const active = ref(0)
import { areaList } from '@vant/area-data'
const address = ref('')
const showPopup = ref(false)
const showDatePicker = ref(false)
const dateResult = ref('')

//设置成本地时间
const currentDate = ref([
  new Date().getFullYear().toString(),
  (new Date().getMonth() + 1).toString(),
  new Date().getDate().toString()
])
const currentTime = ref([new Date().getHours().toString(), new Date().getMinutes().toString()])

const onDateConfirm = () => {
  // showSuccessToast(`${currentDate.value.join('/')} ${currentTime.value.join(':')}`)
  dateResult.value = `${currentDate.value.join('/')} ${currentTime.value.join(':')}`
  showDatePicker.value = false
}

const onConfirm = (result: any) => {
  address.value = result.selectedOptions.map((option: { text: string }) => option.text).join(' ')
  showPopup.value = false
}
</script>

<template>
  <div class="all">
    <van-field
      class="filter"
      v-model="address"
      label="所在地"
      placeholder="请选择地址"
      is-link
      readonly
      @click="showPopup = true"
    />
    <van-popup v-model:show="showPopup" round position="bottom">
      <van-area
        title="选择地区"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showPopup = false"
      />
    </van-popup>
    <van-field
      v-model="dateResult"
      is-link
      readonly
      class="filter"
      name="datePicker"
      label="开始时间"
      placeholder="点击选择时间"
      @click="showDatePicker = true"
    />

    <van-popup round v-model:show="showDatePicker" position="bottom">
      <van-picker-group
        title="开始日期"
        :tabs="['选择日期', '选择时间']"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      >
        <van-date-picker v-model="currentDate" />
        <van-time-picker v-model="currentTime" />
      </van-picker-group>
    </van-popup>

    <van-tabs v-model:active="active" swipeable>
      <van-tab title="全部" name="a">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 10" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="已下单" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 2" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="已接单" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 5" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="进行中" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 2" :key="index" />
          </router-link>
        </div>
      </van-tab>
      <van-tab title="已完成" name="b">
        <div class="page">
          <router-link to="/orderDetail">
            <OrderItem v-for="(item, index) in 1" :key="index" />
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
  </div>
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
.page {
  min-height: 100vh;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 1px;
}
:deep(.van-tabs__nav--line) {
  border-radius: 10px;
}
:deep(.van-tabs__content--animated, .van-tabs__track) {
  border-radius: 10px;
}
.filter {
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
