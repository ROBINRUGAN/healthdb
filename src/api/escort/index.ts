import request from "@/utils/request"
import type { AddEscortParams, EscortResponseData, OrdersEscortListResponseData, OrdersEscortResponseData } from "./type"
import type { ResponseData } from "../type"

enum API{
  // 申请陪诊师
  ADD_ESCORT = '/escort/add',
  // 根据id查询陪诊师信息
  GET_ESCORT_BY_ID = '/escort/get/my/',
  // 根据陪诊师订单完成状态查询订单
  // http://47.113.97.12:9001/orders_escort/status?status=0&uid=988374304
  GET_ESCORT_ORDER_BY_STATUS = '/orders_escort/status'

}

export const addEscort = (data: AddEscortParams) => {
  return request.post<any,ResponseData>(API.ADD_ESCORT, data)
}


export const getEscortById = (id: number) => {
  return request.get<any,EscortResponseData>(API.GET_ESCORT_BY_ID + id)
}

export const getEscortOrderByStatus = (params: { status: number; uid: number }) => {
  return request.get<any,OrdersEscortListResponseData>(API.GET_ESCORT_ORDER_BY_STATUS, { params })
}

