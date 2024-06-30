<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showFailToast, showLoadingToast, showNotify, showSuccessToast } from 'vant'
import type {
  AddPatientParams,
  AddPatientResponseData,
  DeletePatientParams,
  Patient,
  PatientListResponseData
} from '@/api/patient/type'
import { useAuthStore } from '@/stores/auth'
import { reqAddPatient, reqDeletePatient, reqGetPatientList } from '@/api/patient'
import type { ResponseData } from '@/api/type'

const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
  userStore.queryPatients()
}
const pattern = /\d{6}/
const showRelationshipPicker = ref(false)
const userStore = useAuthStore()
const currentUser = ref(userStore.currentUser)
const onConfirmRelationship = ({ selectedOptions }: any) => {
  console.log(selectedOptions)
  newPatient.value.relationship = selectedOptions[0]?.text
  showRelationshipPicker.value = false
}
const router = useRouter()
const showAdd = ref(false)
const newPatient = ref({
  id: 0,
  name: '',
  gender: '男',
  age: '',
  phone: '',
  relationship: ''
})
const relationshipColumns = [
  { text: '本人', value: 'me' },
  { text: '亲属', value: 'dear' },
  { text: '朋友', value: 'friend' }
]

let patients = userStore.patients

const goBack = () => {
  router.go(-1)
}

const addPatient = () => {
  showAdd.value = true
}

const confirmAddPatient = async () => {
  showLoadingToast({
    message: '添加中...',
    duration: 1000
  })
  console.log(newPatient.value)
  // 不为''
  if (
    newPatient.value.name === '' ||
    newPatient.value.age === '' ||
    newPatient.value.phone === '' ||
    newPatient.value.relationship === ''
  ) {
    showFailToast('请填写完整信息')
    return
  }
  const data = ref<AddPatientParams>({
    uid: currentUser.value.id,
    name: newPatient.value.name,
    gender: newPatient.value.gender === '男' ? 1 : 0,
    age: Number(newPatient.value.age),
    telephone: newPatient.value.phone,
    relationship: newPatient.value.relationship
  })
  console.log(data)
  try {
    const res: AddPatientResponseData = await reqAddPatient(data.value)
    if (res.code === 200) {
      showSuccessToast('添加成功')
      newPatient.value.id = res.data.id
      patients.push({ ...newPatient.value })
      newPatient.value = {
        id: 0,
        name: '',
        gender: '男',
        age: '',
        phone: '',
        relationship: ''
      }
    } else {
      showFailToast(res.message || '添加失败')
    }
  } catch (error) {
    showFailToast('添加失败')
  }
}

// 删除就诊人
const removePatient = async (index: number) => {
  showLoadingToast({
    message: '删除中...',
    duration: 2000,
    forbidClick: true
  })
  // 拿到就诊人id
  const data = ref<DeletePatientParams>({
    id: patients[index].id
  })
  const res: ResponseData = await reqDeletePatient(data.value)
  if (res.code === 200) {
    patients.splice(index, 1)
    showSuccessToast('删除成功')
  } else {
    showFailToast(res.message || '删除失败')
  }
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <van-nav-bar title="我的就诊人" left-text="返回" left-arrow @click-left="goBack" />

      <div class="all">
        <van-cell-group style="background-color: transparent">
          <van-cell v-for="(patient, index) in patients" :key="index">
            <template #title>
              <div>
                <div>
                  {{ patient.name }} <span class="gender">{{ patient.gender }}</span>
                  <van-tag type="primary" size="medium" round>{{ patient.relationship }}</van-tag>
                </div>
                <div>{{ patient.age }}周岁 {{ patient.phone }}</div>
              </div>
            </template>
            <template #right-icon>
              <button class="deletebtn" @click="removePatient(index)">删除</button>
            </template>
          </van-cell>
        </van-cell-group>

        <van-dialog
          v-model:show="showAdd"
          title="新增就诊人"
          show-cancel-button
          @confirm="confirmAddPatient"
        >
          <van-form>
            <van-cell-group inset>
              <van-field
                class="addField"
                v-model="newPatient.name"
                label="姓名"
                required
                placeholder="请输入姓名"
                style="margin-top: 20px"
                :rules="[
                  { required: true, message: '请输入姓名' },
                  { pattern: /^[\u4e00-\u9fa5]{2,4}$/, message: '姓名必须是2-4个汉字' }
                ]"
              />
            </van-cell-group>
            <van-cell-group inset>
              <div class="addField sexField">
                <span class="required-star">性别</span>
                <van-radio-group
                  class="addField"
                  v-model="newPatient.gender"
                  direction="horizontal"
                >
                  <van-radio name="男">男</van-radio>
                  <van-radio name="女">女</van-radio>
                </van-radio-group>
              </div>
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                class="addField"
                v-model="newPatient.age"
                label="年龄"
                type="number"
                required
                placeholder="请输入年龄"
                :rules="[
                  { required: true, message: '请输入年龄' },
                  { pattern: /^[0-9]+$/, message: '年龄必须是数字' },
                  { pattern: /^(?:1[01][0-9]|120|[1-9]?[0-9])$/, message: '年龄必须在0到120岁之间' }
                ]"
              />
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                class="addField"
                v-model="newPatient.phone"
                label="电话"
                type="tel"
                required
                placeholder="请输入电话"
                :rules="[
                  { required: true, message: '请填写您的手机号码！' },
                  { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
                ]"
                style="margin-bottom: 20px"
              />
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                class="addField"
                v-model="newPatient.relationship"
                label="关系"
                required
                placeholder="选择关系"
                is-link
                clickable
                readonly
                @click="showRelationshipPicker = true"
              />
            </van-cell-group>

            <!-- 关系选择器 -->
            <van-popup v-model:show="showRelationshipPicker" position="bottom">
              <van-picker
                show-toolbar
                title="选择关系"
                :columns="relationshipColumns"
                @confirm="onConfirmRelationship"
                @cancel="showRelationshipPicker = false"
              />
            </van-popup>
          </van-form>
        </van-dialog>

        <div class="add-patient">
          <van-button class="select" type="primary" plain icon="plus" @click="addPatient">
            新增就诊人
          </van-button>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.all {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 16px;
}

.van-cell {
  background-color: #fff;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.gender {
  color: #3f51b5;
  margin-left: 8px;
  margin-right: 10px;
}

.add-patient {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.deletebtn {
  border: 1px solid rgba(54, 52, 203, 1);
  background-color: white;
  color: rgba(54, 52, 203, 1);
  border-radius: 20px;
  padding: 5px 20px;
  font-size: 14px;
  margin: auto;
  height: fit-content;
}

.deletebtn:active {
  background-color: rgba(54, 52, 203, 1);
  color: white;
}
.addField {
  border-radius: 20px;
  width: 90%;
  margin: 10px auto;
}
.sexField {
  font-size: 14px;
  padding: 5px;
  border-radius: 20px;
  /* background-color: red; */
  /* 加一点阴影，和van-field的一致 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}
.required-star::before {
  content: '*';
  color: red;
  margin-right: 2px;
}
.required-star {
  margin-right: 4px;
  width: 50%;
  margin-left: 10px;
  align-self: center;
}
.select {
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
