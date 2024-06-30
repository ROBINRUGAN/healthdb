<script lang="ts" setup>
import { ref } from 'vue'
import { areaList } from '@vant/area-data'
import { showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const showPopup = ref(false)
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}
const formData = ref({
  fullName: '',
  nickName: '',
  gender: null,
  age: Number,
  address: '',
  phoneNumber: '',
  isMedicalStaff: null,
  occupation: '',
  id: '',
  info: ''
})
const onConfirm = (result: any) => {
  console.log(result)
  formData.value.address = result.selectedOptions
    .map((option: { text: string }) => option.text)
    .join(' ')
  showPopup.value = false
}

const submitForm = () => {
  console.log('Submitted Data:', formData.value)
  // 实际的提交逻辑
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <h3>申请成为陪诊师</h3>
      <div class="form-container">
        <van-form>
          <van-cell-group>
            <van-field v-model="formData.fullName" label="真实姓名" placeholder="请输入真实姓名" />
            <van-field v-model="formData.nickName" label="昵称" placeholder="请输入昵称" />
            <van-cell title="性别" value-class="cell-value">
              <template #right-icon>
                <van-radio-group v-model="formData.gender" direction="horizontal">
                  <van-radio name="male" :value="1">男</van-radio>
                  <van-radio name="female" :value="0">女</van-radio>
                </van-radio-group>
              </template>
            </van-cell>
            <van-field v-model="formData.age" label="年龄" placeholder="请输入年龄" type="number" />
            <van-field
              v-model="formData.address"
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
              v-model="formData.phoneNumber"
              label="手机号"
              placeholder="请输入手机号"
              type="tel"
            />
            <van-cell title="是否为医护人员" value-class="cell-value">
              <template #right-icon>
                <van-radio-group v-model="formData.isMedicalStaff" direction="horizontal">
                  <van-radio name="yes" :value="true">是</van-radio>
                  <van-radio name="no" :value="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-cell>
            <van-field
              v-if="0"
              v-model="formData.occupation"
              label="工作科室"
              placeholder="请输入工作科室"
            />
            <van-field v-model="formData.id" label="身份证号" placeholder="请输入身份证号" />
            <van-field v-model="formData.info" label="备注" placeholder="请输入备注" />
          </van-cell-group>
          <button class="select" @click="submitForm">提交申请</button>
        </van-form>
      </div>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
h3 {
  text-align: center;
  padding: 20px 0;
}
.all {
  min-height: 100vh;
  background-color: rgb(245, 240, 250);
}
.form-container {
  width: 90%;
  padding: 20px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
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
