import service from '@/utils/request'
import type { HospitalListResponseData, HospitalResponseData } from './type'

enum API {
  // 根据id查询医院
  GET_HOSPITAL_BY_ID = '/hospital/query/by/',
  // 根据地区代码查询
  GET_HOSPITAL_BY_AREA = '/hospital/query/area/',
  // 根据名称模糊查询
  GET_HOSPITAL_BY_NAME = '/hospital/query/name?name='
}

export const reqGetHospitalById = (id: number) => {
  return service.get<any, HospitalResponseData>(API.GET_HOSPITAL_BY_ID + id)
}

export const reqGetHospitalByArea = (areaCode: number) => {
  return service.get<any, HospitalListResponseData>(API.GET_HOSPITAL_BY_AREA + areaCode)
}

export const reqGetHospitalByName = (name: string) => {
  return service.get<any, HospitalListResponseData>(API.GET_HOSPITAL_BY_NAME + name)
}
