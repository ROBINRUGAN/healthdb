<script setup lang="ts">
import { showSuccessToast } from 'vant'
import { ref, onMounted } from 'vue'
const serviceResult = ref('')
const patientResult = ref('')
const dateResult = ref('')
const endDateResult = ref('')

const showServicePicker = ref(false)
const ServiceColumns = [
  { text: '普通服务', value: 'normal' },
  { text: '急诊服务', value: 'emergency' },
  { text: '预约服务', value: 'appointment' },
  { text: '陪同服务', value: 'accompany' },
  { text: '接送服务', value: 'pickUp' },
  { text: '其他服务', value: 'other' }
]
const showPatientPicker = ref(false)
const patientColumns = [
  { text: '张三', value: 'Zhangsan' },
  { text: '李四', value: 'Lisi' },
  { text: '王五', value: 'Wangwu' },
  { text: '赵六', value: 'Zhaoliu' },
  { text: '钱七', value: 'Qianqi' }
]
const showDatePicker = ref(false)
const showEndDatePicker = ref(false)

//设置从现在到未来10年
const minDate = ref(new Date())
const maxDate = ref(new Date(new Date().getFullYear() + 10, 11, 31))

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
const onEndDateConfirm = () => {
  // showSuccessToast(`${currentDate.value.join('/')} ${currentTime.value.join(':')}`)
  endDateResult.value = `${currentDate.value.join('/')} ${currentTime.value.join(':')}`
  showEndDatePicker.value = false
}

const onServiceConfirm = ({ selectedOptions }: any) => {
  serviceResult.value = selectedOptions[0]?.text
  showServicePicker.value = false
}
const onPatientConfirm = ({ selectedOptions }: any) => {
  patientResult.value = selectedOptions[0]?.text
  showPatientPicker.value = false
}
const info = ref('')

const patientData = ref([
  { name: '张三', tel: '13000000000' },
  { name: '李四', tel: '13100000000' },
  { name: '王五', tel: '13200000000' },
  { name: '赵六', tel: '13300000000' },
  { name: '钱七', tel: '13400000000' }
])
const onEdit = (item: any) => {
  showPatientPicker.value = false
  patientResult.value = item.name
}

const onSubmit = (values: any) => {
  showSuccessToast({
    message: '提交成功',
    duration: 1000,
    onClose() {
      console.log('onClose')
    }
  })
}
</script>
<template>
  <div>
    <van-nav-bar title="填写陪诊单" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="all">
      <h3>陪诊服务单</h3>

      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="serviceResult"
            is-link
            readonly
            name="servicePicker"
            label="服务类型"
            placeholder="选择陪诊服务类型"
            @click="showServicePicker = true"
          />
          <van-popup round v-model:show="showServicePicker" position="bottom">
            <van-picker
              title="服务类型"
              :columns="ServiceColumns"
              @confirm="onServiceConfirm"
              @cancel="showServicePicker = false"
            />
          </van-popup>
          <van-field
            v-model="patientResult"
            is-link
            readonly
            name="patientPicker"
            label="就诊人"
            placeholder="选择就诊人"
            @click="showPatientPicker = true"
          />
          <!-- <van-popup v-model:show="showPatientPicker" position="bottom"> -->
          <van-action-sheet v-model:show="showPatientPicker" title="选择就诊人">
            <van-contact-card
              v-for="(item, index) in patientData"
              :key="index"
              type="edit"
              :tel="item.tel"
              :name="item.name"
              @click="onEdit(item)"
            />
          </van-action-sheet>
          <!-- </van-popup> -->

          <van-field
            v-model="dateResult"
            is-link
            readonly
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
              <van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
              <van-time-picker v-model="currentTime" />
            </van-picker-group>
          </van-popup>

          <van-field
            v-model="endDateResult"
            is-link
            readonly
            name="datePicker"
            label="结束时间"
            placeholder="点击选择时间"
            @click="showEndDatePicker = true"
          />

          <van-popup round v-model:show="showEndDatePicker" position="bottom">
            <van-picker-group
              title="结束日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="onEndDateConfirm"
              @cancel="showEndDatePicker = false"
            >
              <van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
              <van-time-picker v-model="currentTime" />
            </van-picker-group>
          </van-popup>

          <van-field
            v-model="info"
            name="备注"
            label="备注"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入备注"
            show-word-limit
          />
        </van-cell-group>
        <div style="margin: 16px">
          <button @click="onSubmit" class="select">提交</button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<style scoped>
.all {
  min-height: 90vh;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 15px;
  margin: auto;
  padding-bottom: 60px;
  background-color: rgb(245, 240, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  margin-top: 10px;
  margin-bottom: 20px;
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
