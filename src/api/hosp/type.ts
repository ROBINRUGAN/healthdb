

// 医院

import exp from "constants"
import type { ResponseData } from "../type"

// hospitalLevel: 1 二级甲等
// hospitalLevel: 2 三级甲等
// hospitalLevel: 3 三级乙等
// hospitalLevel: 4 三级医院
// hospitalLevel: 5 二级医院
// hospitalLevel: 6 一级医院
// hospitalLevel: 7 未评级

export const hospitalLevelMap = {
  1: '二级甲等',
  2: '三级甲等',
  3: '三级乙等',
  4: '三级医院',
  5: '二级医院',
  6: '一级医院',
  7: '未评级'
}

export interface Hospital {
  id: number
  name: string
  hospitalLevel: number
  hospitalType: string
  introduction: string
  areaCode: number
  detailAddress: string
}

export interface HospitalResponseData extends ResponseData{
  data: Hospital
}

export type HospitalList = Hospital[]

export interface HospitalListResponseData extends ResponseData{
  data: HospitalList
}