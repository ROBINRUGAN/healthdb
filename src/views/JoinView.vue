<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import mewImage from '@/assets/me/patient.jpeg'
import { areaList } from '@vant/area-data'
import { useAuthStore } from '@/stores/auth'
import type { AddEscortParams } from '@/api/escort/type'
import { showNotify } from 'vant/lib/notify'
import { addEscort } from '@/api/escort'
import type { ResponseData } from '@/api/type'
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant'
const showPopup = ref(false)
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}
const userStore = useAuthStore()
const currentUser = userStore.currentUser
let selectedCity = ref('')
const age = ref<number>()
const formData = ref<AddEscortParams>({
  uid: currentUser.id,
  avatar: mewImage,
  isMedicalWorker: 0,
  workSection: '',
  age: 0,
  gender: -1,
  telephone: '',
  area_code: 0
})

const onConfirm = (result: any) => {
  try {
    if (
      result &&
      result.selectedOptions &&
      Array.isArray(result.selectedOptions) &&
      result.selectedOptions.length > 0
    ) {
      const selectedOption = result.selectedOptions[1]
      const areaCode = selectedOption.value
      selectedCity.value = result.selectedOptions
        .map((option: { text: string }) => option.text)
        .join(' / ')

      // 字符串转数字
      formData.value.area_code = parseInt(areaCode)
      showPopup.value = false
    } else {
      throw new Error('Invalid result structure')
    }
  } catch (error) {
    showNotify({ type: 'danger', message: `选择地区时出错` })
  }
}

const submitForm = async () => {
  console.log('Submitted Data:', formData.value)
  // 不为空
  if (
    (userStore.isIdentified === 0 && formData.value.name === '') ||
    (userStore.isIdentified === 0 && formData.value.identity === '') ||
    formData.value.telephone === '' ||
    formData.value.area_code === 0 ||
    formData.value.gender === -1 ||
    age.value === undefined ||
    (formData.value.isMedicalWorker == 1 && formData.value.workSection == '')
  ) {
    showNotify({ type: 'danger', message: '请填写完整信息' })
    return
  }
  // 年龄校验 18-60
  if (age.value < 18 || age.value > 60) {
    showNotify({ type: 'danger', message: '年龄需在18-60岁之间' })
    return
  }
  // 手机号校验
  const phonePattern = /^1[3456789]\d{9}$/
  if (!phonePattern.test(formData.value.telephone ?? '')) {
    showNotify({ type: 'danger', message: '请输入正确的手机号' })
    return
  }
  // 保存年龄,整数
  formData.value.age = age.value
  showLoadingToast({
    message: '提交中...',
    duration: 4000,
    forbidClick: true
  })
  // 实际的提交逻辑
  const res: ResponseData = await addEscort(formData.value)
  if (res.code === 200) {
    showSuccessToast('提交成功')
    userStore.setIsCompanion(1)
  } else {
    showFailToast('提交失败')
  }
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="all">
      <h3>申请成为陪诊师</h3>
      <div class="form-container">
        <van-form>
          <van-cell-group>
            <van-field
              v-model="formData.name"
              label="真实姓名"
              :placeholder="userStore.isIdentified === 1 ? currentUser.realname : '请输入真实姓名'"
              :readonly="userStore.isIdentified === 1"
              :value="formData.name"
            />
            <van-field
              v-model="formData.identity"
              label="身份证号"
              :placeholder="userStore.isIdentified === 1 ? currentUser.idNumber : '请输入身份证号'"
              :readonly="userStore.isIdentified === 1"
              :value="formData.identity"
            />
            <van-cell title="性别" value-class="cell-value">
              <template #right-icon>
                <van-radio-group v-model="formData.gender" direction="horizontal">
                  <van-radio :name="1" :value="1">男</van-radio>
                  <van-radio :name="0" :value="0">女</van-radio>
                </van-radio-group>
              </template>
            </van-cell>
            <van-field
              v-model="age"
              label="年龄"
              placeholder="请输入年龄"
              type="number"
              @update:modelValue="(val) => (age = val ? parseInt(val) : undefined)"
            />
            <van-field
              v-model="selectedCity"
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
              v-model="formData.telephone"
              label="手机号"
              placeholder="请输入手机号"
              type="tel"
            />
            <van-cell title="是否为医护人员" value-class="cell-value">
              <template #right-icon>
                <van-radio-group v-model="formData.isMedicalWorker" direction="horizontal">
                  <van-radio :name="1" :value="true">是</van-radio>
                  <van-radio :name="0" :value="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-cell>
            <van-field
              v-model="formData.workSection"
              v-if="formData.isMedicalWorker == 1"
              label="工作科室"
              placeholder="请输入工作科室"
            />
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
