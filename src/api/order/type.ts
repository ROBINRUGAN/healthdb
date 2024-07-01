
import type { ResponseData } from '../type'

export enum OrderStatus {
  SUCCESS = 0,
  RECEIVED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3
}

export const getOrderStatus = (status: number) => {
  switch (status) {
    case OrderStatus.SUCCESS:
      return '已下单'
    case OrderStatus.RECEIVED:
      return '已接单'
    case OrderStatus.IN_PROGRESS:
      return '进行中'
    case OrderStatus.COMPLETED:
      return '已完成'
    default:
      return '未知'
  }
}

export interface Order {
  serverType: string
  pname: string
  gender: number
  age: number
  telephoneNumber: string
  relationship: string
  startTime: string
  endTime: string
  money: number
  hname: string
  oid: number
  requirement: string
  status: number
  ename: string
  updateTime: string
  eid: number
}

export interface OrderDetail extends ResponseData {
  data: Order
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
  isFinished?: number
  money?: number
  sname?: string
  pname?: string
  
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
  sort?: number,
  status?: number
}

export type OrderList = Order[]

export interface OrderListResponse extends ResponseData {
  data: OrderList
}
