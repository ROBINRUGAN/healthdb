<script setup lang="ts">
import mewImage from '@/assets/me/patient.jpeg'
</script>

<template>
  <div class="all">
    <div class="top">
      <van-image round width="80px" height="80px" :src="mewImage" />
      <div class="info">
        <h3>林黄骁</h3>
        <h5>id: 1145141212</h5>
      </div>
    </div>
    <div class="twoWrapper">
      <div class="wrapper">
        <h4>用户余额（元）</h4>
        <h1>1893.00</h1>
      </div>
      <div class="btns">
        <button class="btn1">充值</button>
        <button class="btn2">提现</button>
      </div>
    </div>

    <van-cell-group class="group">
      <van-cell class="groupItem" icon="records-o" title="待评价" is-link to="/comment" />
      <van-cell class="groupItem" icon="user-o" title="个人信息" is-link to="userinfo" />
      <van-cell class="groupItem" icon="friends-o" title="就诊人管理" is-link to="/patients" />
      <van-cell class="groupItem" icon="chat-o" title="意见反馈" is-link />
    </van-cell-group>
  </div>
</template>
<style scoped>
.top {
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  display: flex;
  align-items: center;
  background-image: url('@/assets/home/back.png');
  padding-bottom: 60px;
}
.info {
  margin-left: 20px;
}
h5 {
  margin-top: 5px;
  font-weight: 600;
}
.wrapper {
  align-self: center;
}
.twoWrapper {
  z-index: 100;
  width: 90%;
  margin: auto;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(253, 238, 172, 1) 0%,
    rgba(254, 250, 131, 1) 0%,
    rgba(252, 202, 0, 1) 100%
  );
  margin-top: -45px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
h1 {
  color: white;
  margin-top: 10px;
  font-size: 40px;
  margin-left: -5px;
}
.btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}
.btn1 {
  border-radius: 20px;
  border: none;
  background: linear-gradient(180deg, rgba(108, 229, 242, 1) 0%, rgba(52, 179, 221, 1) 99%);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  padding: 10px 20px;
}
.btn1:active {
  background: linear-gradient(180deg, rgba(52, 179, 221, 1) 0%, rgba(108, 229, 242, 1) 99%);
}
.btn2 {
  border-radius: 20px;
  border: none;
  background: linear-gradient(180deg, rgba(170, 142, 242, 1) 0%, rgba(54, 52, 203, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 10px;
}
.btn2:active {
  background: linear-gradient(180deg, rgba(54, 52, 203, 1) 0%, rgba(170, 142, 242, 1) 100%);
}
.group {
  width: 90%;
  margin: auto;
  margin-top: 10px;
}
.groupItem {
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  border-radius: 10px;
}
</style>
