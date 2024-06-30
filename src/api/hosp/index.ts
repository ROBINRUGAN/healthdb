import service from '@/utils/request'
import type { HospitalListResponseData, HospitalResponseData } from './type'

enum API {
  // 根据id查询医院
  GET_HOSPITAL_BY_ID = '/hospital/query/by/',
  // 根据地区代码查询
  GET_HOSPITAL_BY_AREA = '/hospital/query/area/',
  // 根据名称（非必须）和地区码（非必须）模糊查询
  // http://47.113.97.12:9001/hospital/query/name?name=%E5%8C%BB%E9%99%A2&area_code=3910
  GET_HOSPITAL_BY_NAME = '/hospital/query/name',
}

export const reqGetHospitalById = (id: number) => {
  return service.get<any, HospitalResponseData>(API.GET_HOSPITAL_BY_ID + id)
}

export const reqGetHospitalByArea = (areaCode: number) => {
  return service.get<any, HospitalListResponseData>(API.GET_HOSPITAL_BY_AREA + areaCode)
}

export const reqGetHospitalByName = (params: { name?: string; area_code?: number }) => {
  return service.get<any, HospitalListResponseData>(API.GET_HOSPITAL_BY_NAME, { params })
}

