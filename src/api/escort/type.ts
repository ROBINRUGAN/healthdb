import type { ResponseData } from '../type'

export enum OrderEscortStatus {
  SUCCESS = 0,
  RECEIVED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3
}

export const getOrderEscortStatus = (status: number) => {
  switch (status) {
    case OrderEscortStatus.SUCCESS:
      return '可接单'
    case OrderEscortStatus.RECEIVED:
      return '未开始'
    case OrderEscortStatus.IN_PROGRESS:
      return '进行中'
    case OrderEscortStatus.COMPLETED:
      return '已完成'
    default:
      return '未知'
  }
}

export interface Escort {
  id: number
  uid: number
  avatar: string
  isMedicalWorker: number
  workSection: string
  age: number
  gender: number
  telephone: string
  areaCode: string
  name: string
  identity: string
  isPassed: number
}

export interface OrdersEscort {
  age?: number
  ename?: string
  gender?: number
  hname?: string
  money: number
  oid?: number
  pname?: string
  relationship?: string
  requirement?: string
  serverType?: string
  startTime?: string
  endTime?: string
  status?: number
  telephoneNumber?: string
  updateTime?: string
}

export type OrdersEscortList = OrdersEscort[]

export interface OrdersEscortListResponseData extends ResponseData {
  data: OrdersEscortList
}

export interface EscortResponseData extends ResponseData {
  data: Escort
}

export interface OrdersEscortResponseData extends ResponseData {
  data: OrdersEscort
}

export interface AddEscortParams {
  uid: number
  avatar: string
  isMedicalWorker: number
  workSection: string
  age: number
  gender: number
  telephone: string
  area_code: number
  name?: string
  identity?: string
}
