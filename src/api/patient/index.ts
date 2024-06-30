import service from "@/utils/request"
import type { AddPatientParams, AddPatientResponseData, DeletePatientParams, PatientListResponseData } from "./type"
import type { ResponseData } from "../type"

enum API{
  // 添加就诊人
  ADD_PATIENT = '/patient/add',
  // 删除就诊人
  DELETE_PATIENT = '/patient/delete',
  // 查询就诊人列表
  GET_PATIENT_LIST = '/patient/my/',
}

export const reqAddPatient = (data: AddPatientParams) => {
  return service.post<any, AddPatientResponseData>(API.ADD_PATIENT, data)
}

export const reqDeletePatient = (data: DeletePatientParams) => {
  return service.post<any, ResponseData>(API.DELETE_PATIENT, data)
}

export const reqGetPatientList = (uid: number) => {
  return service.get<any, PatientListResponseData>(API.GET_PATIENT_LIST + uid)
}