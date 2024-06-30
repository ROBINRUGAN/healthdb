
import type { ResponseData } from '../type'

export enum OrderStatus {
  SUCCESS = 0,
  RECEIVED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3
}

export interface Order {
  serverType: string
  pname: string
  gender: number
  age: number
  telephoneNumber: string
  relationship: string
  startTime: string
  money: number
  hname: string
  oid: number
  requirement: string
  status: number
  ename: string
  updateTime: string
}

// 用户下单参数
export interface addOrdersParams {
  uid: number
  hid: number
  pid: number
  sid: number
  startTime: string
  endTime: string
  telephone: string
  requirement: string
  isFinished: number
}

// 陪诊师接单参数
export interface addOrdersEscortParams {
  uid: number
  oid: number
}

// 多条件查询订单列表参数
export interface OrderListSearchParams {
  uid: number,
  startTime?: string,
  endTime?: string,
  name?: string,
  sort?: number
}

export type OrderList = Order[]

export interface OrderListResponse extends ResponseData {
  data: OrderList
}
