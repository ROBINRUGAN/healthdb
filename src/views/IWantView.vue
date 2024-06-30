<script setup lang="ts">
import { showSuccessToast, showLoadingToast, showDialog } from 'vant'
import { ref, onMounted } from 'vue'
import router from '@/router'
import { showConfirmDialog, showFailToast } from 'vant'
import { useRoute } from 'vue-router'
import { reqGetHospitalServerByHid } from '@/api/hosp_server'
import type { HospitalServerList, HospitalServerListResponseData } from '@/api/hosp_server/type'
import { useAuthStore } from '@/stores/auth'
import type { addOrdersParams } from '@/api/order/type'

const serviceResult = ref('')
const serviceResultId = ref()
const patientResultName = ref('')
const patientResultTel = ref('')
const patientResultId = ref()
const dateResult = ref('')
const endDateResult = ref('')
const limitTime = ref()
const showAmount = ref(false)
const loading = ref(false)
const route = useRoute()
const userStore = useAuthStore()
const amount = ref()
interface PatientData {
  id: number
  name: string
  tel: string
}
const patientData = ref<PatientData[]>([])
interface ServiceNoticeColumn {
  name: string
  text: string
  sid: number
}
const serviceNoticeColumns = ref<ServiceNoticeColumn[]>([
  {
    name: '院内服务',
    text: '陪诊师协助完成病友院内就诊流程，含规划就诊流程、协助排队取号、排队缴费、代取报告、排队取药等服务陪诊师与病友在约定的医院汇合，院内陪诊师协助完成病友就诊流程，含规划就诊流程、院内协助排队取号、排队缴费、当次服务时间内代取报告、排队取药等服务。最长6小时全程服务。',
    sid: 1
  },
  {
    name: '全程服务',
    text: '陪诊师协助完成病友全就诊流程，含接送服务规划就诊流程、协助排队取号、排队缴费、代取报告、排队取药等服务。陪诊师与病友在约定的地点汇合，含院外全程接送及规划就诊流程，院内协助排队取号、排队缴费、当次服务时间内代取报告、排队取药等服务。最长4小时全程服务。',
    sid: 2
  },
  {
    name: '尊享服务',
    text: '从家门—医院—家门的一站式陪诊服务，协助完成病友全就诊流程，含接送，诊前挂号预约;规划就诊流程、协助排队取号、排队缴费次日代取报告及寄送等服务。陪诊师与病友在约定的地点汇合，含院外全程接送诊前挂号预约及规划就诊流程;院内协助排排队取号排队缴费、次日代取报告及寄送、排队取药等服务无服务时间限制，直至完成全环节就诊。',
    sid: 3
  }
])
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功')
    loading.value = false
  }, 1000)
}

onMounted(() => {
  queryServiceType()
  userStore.queryPatients()
  userStore.patients.forEach((item) => {
    patientData.value.push({ id: item.id, name: item.name, tel: item.phone })
  })
  console.log(patientData.value)
})

const showServicePicker = ref(false)
interface ServiceColumn {
  text: string
  value: number
}
const serviceColumns = ref<ServiceColumn[]>()
const serviceList = ref<HospitalServerList>()
const showPatientPicker = ref(false)
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
  // "2024-7-03 20:00:00"
  dateResult.value = `${currentDate.value.join('-')} ${currentTime.value.join(':')}` + ':00'
  showDatePicker.value = false
}
const onEndDateConfirm = () => {
  endDateResult.value = `${currentDate.value.join('-')} ${currentTime.value.join(':')}` + ':00'
  showEndDatePicker.value = false
}

const onServiceConfirm = ({ selectedOptions }: any) => {
  serviceResult.value = selectedOptions[0]?.text
  serviceResultId.value = selectedOptions[0]?.value
  showServicePicker.value = false
  const selectService = serviceNoticeColumns.value.find(
    (item) => item.sid === serviceResultId.value
  )
  limitTime.value = serviceList.value?.find((item) => item.id === serviceResultId.value)?.limit
  amount.value = serviceList.value?.find((item) => item.id === serviceResultId.value)?.money
  showDialog({
    title: serviceResult.value,
    message: selectService?.text
  })
  showAmount.value = true
}
const onPatientConfirm = ({ selectedOptions }: any) => {

  showPatientPicker.value = false
  console.log(selectedOptions[0]?.text)
}
const info = ref('')

// 查询当前医院的服务类型
const queryServiceType = async () => {
  try {
    const hid = route.query.hid
    if (!hid) {
      showFailToast('未找到医院信息')
      return
    }
    const id = parseInt(hid as string)
    const res: HospitalServerListResponseData = await reqGetHospitalServerByHid(id)
    if (res.code === 200) {
      console.log(res.data)
      serviceList.value = res.data
      serviceColumns.value = res.data.map((item) => {
        return { text: item.name, value: item.id }
      })
    } else {
      throw new Error(res.message || '加载失败')
    }
  } catch (error) {
    showFailToast('加载失败')
  }
}

const onEdit = (item: PatientData) => {
  showPatientPicker.value = false
  patientResultName.value = item.name
  patientResultId.value = item.id
  patientResultTel.value = item.tel
}

const onSubmit = (values: any) => {
  showLoadingToast({
    message: '加载中...',
    duration: 1000,
    forbidClick: true
    // onClose() {
    //   router.push('/payment')
    // }
  })
  console.log(values)
  if (!serviceResultId.value||!patientResultId.value||!dateResult.value||!endDateResult.value) {
    showFailToast('请填写完整信息')
    return
  }
  if (new Date(dateResult.value) > new Date(endDateResult.value)) {
    showFailToast('开始时间不能大于结束时间')
    return
  }
  if (new Date(dateResult.value) < new Date()) {
    showFailToast('开始时间不能小于当前时间')
    return
  }
  // 小时单位
  if (new Date(endDateResult.value).getTime() - new Date(dateResult.value).getTime() > limitTime.value * 60 * 60 * 1000) {
    showFailToast('服务时间超过限制')
    return
  }
  const data: addOrdersParams = {
    uid: userStore.currentUser.id,
    hid: parseInt(route.query.hid as string),
    sid: serviceResultId.value,
    pid: patientResultId.value,
    startTime: dateResult.value,
    endTime: endDateResult.value,
    telephone: patientResultTel.value,
    requirement: info.value,
    money: amount.value,
    sname: serviceResult.value,
    pname: patientResultName.value
  }
  
  console.log(data)
  router.push({
    path: '/payment',
    query: {
      data: JSON.stringify(data)
    }
  })
}
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div>
      <van-nav-bar title="填写陪诊单" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <div class="all">
        <h3>陪诊服务单</h3>
        <div
          style="
            padding: 20px 0;
            border-radius: 20px;
            background-color: white;
            width: 90%;
            margin-bottom: 20px;
          "
        >
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
                  :columns="serviceColumns"
                  @confirm="onServiceConfirm"
                  @cancel="showServicePicker = false"
                />
              </van-popup>
              <van-field
                v-model="patientResultName"
                is-link
                readonly
                name="patientPicker"
                label="就诊人"
                placeholder="选择就诊人"
                @click="(showPatientPicker = true), userStore.queryPatients()"
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
          </van-form>

          <div v-if="showAmount" class="amount">¥ {{ amount }}</div>
        </div>
        <button @click="onSubmit" class="select">提交</button>
      </div>
    </div>
  </van-pull-refresh>
</template>
<style scoped>
.all {
  min-height: 90vh;

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
  width: 90%;
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
.amount {
  width: 80%;
  margin: auto;
  background-color: white;
  font-weight: bold;
  color: rgb(196, 3, 3);
  font-size: 32px;
  text-align: end;
  margin-top: 20px;
  /* margin-right: 20px; */
}
</style>
