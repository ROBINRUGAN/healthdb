<template>
  <div class="hospital-badge">
    <img src="@/assets/hosp/demo.jpg" alt="" />
    <div class="content">
      <div class="badge-header">
        <h3>福建医科大学附属协和医院</h3>
      </div>
      <div class="badge-content">
        <p>就诊人: {{ name }}</p>
        <p>就诊时间: {{ time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('林黄骁')
const time = ref('2024-06-30')
</script>

<style scoped>
.hospital-badge {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 10px 0px;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge-header h3 {
  margin: 0;
  color: #000000;
  font-size: 15px;
  line-height: 20px;
}

.badge-content p {
  margin: 5px 0;
  font-size: 13px;
  color: black;
}
img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-right: 12px;
}
.content {
  width: 80%;
  line-height: 16px;
}
</style>
