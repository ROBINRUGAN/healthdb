<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Cell,
  CellGroup,
  Button,
  Icon,
  showLoadingToast,
  showSuccessToast,
  Dialog,
  RadioGroup,
  Radio
} from 'vant'
const pattern = /\d{6}/

const router = useRouter()
const showAdd = ref(false)
const newPatient = ref({ name: '', gender: '男', age: '', phone: '' })

const patients = ref([
  { name: '翁鹏', gender: '男', age: '20', phone: '13748276637' },
  { name: '吴荣榜', gender: '男', age: '20', phone: '13748276637' }
])

const goBack = () => {
  router.go(-1)
}

const addPatient = () => {
  showAdd.value = true
}

const confirmAddPatient = () => {
  showLoadingToast({
    message: '添加中...',
    duration: 1000,
    onClose: () => {
      patients.value.push({ ...newPatient.value })
      newPatient.value = { name: '', gender: '男', age: '', phone: '' }
      showSuccessToast('添加成功')
      showAdd.value = false
    }
  })
}

const removePatient = (index: number) => {
  showLoadingToast({
    message: '删除中...',
    duration: 1000,
    onClose: () => {
      patients.value.splice(index, 1)
      showSuccessToast('删除成功')
    }
  })
}
</script>

<template>
  <div class="all">
    <van-nav-bar title="我的就诊人" left-text="返回" left-arrow @click-left="goBack" />

    <van-cell-group style="background-color: transparent">
      <van-cell v-for="(patient, index) in patients" :key="index">
        <template #title>
          <div>
            <div>
              {{ patient.name }} <span class="gender">{{ patient.gender }}</span>
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
            <van-radio-group class="addField" v-model="newPatient.gender" direction="horizontal">
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
      </van-form>
    </van-dialog>

    <div class="add-patient">
      <van-button type="primary" plain icon="plus" @click="addPatient"> 新增就诊人 </van-button>
    </div>
  </div>
</template>

<style scoped>
.all {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 16px;
}

.van-nav-bar {
  margin-bottom: 16px;
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
</style>