import service from "@/utils/request"
import type { ResponseData } from "../type"
import type { Order, OrderListResponse, addOrdersEscortParams, addOrdersParams } from "./type"

enum API{
  // /orders/add
  ADD_ORDER = '/orders/add',
  // /orders/delete
  DELETE_ORDER = '/orders/delete',
  // /orders_escort/add
  ADD_ORDER_ESCORT = '/orders_escort/add',
  // /orders/status  
  // http://47.113.97.12:9001/orders/status?status=0&uid=1
  UPDATE_ORDER_STATUS = '/orders/status',
  // /orders_escort/delete
  DELETE_ORDER_ESCORT = '/orders_escort/delete',
  // /orders/update/isFinished
  UPDATE_ORDER_ISFINISHED = '/orders/update/isFinished',
  // /orders/query/by/{id}
  QUERY_ORDER_BY_ID = '/orders/query/by/',
  // /orders/query/multiple
  QUERY_ORDER_MULTIPLE = '/orders/query/multiple',
  // /orders/update
  UPDATE_ORDER = '/orders/update',
}

export const reqAddOrder = (data: addOrdersParams) => {
  return service.post<any, ResponseData>(API.ADD_ORDER, data)
}

export const reqDeleteOrder = (id: number) => {
  return service.post<any, ResponseData>(API.DELETE_ORDER, { id })
}

export const reqAddOrderEscort = (data: addOrdersEscortParams) => {
  return service.post<any, ResponseData>(API.ADD_ORDER_ESCORT, data)
}

export const reqUpdateOrderStatus = (params: { status: number; uid: number }) => {
  return service.get<any, OrderListResponse>(API.UPDATE_ORDER_STATUS, { params })
}

export const reqDeleteOrderEscort = (id: number) => {
  return service.post<any, ResponseData>(API.DELETE_ORDER_ESCORT, { id })
}

export const reqUpdateOrderIsFinished = (id: number) => {
  return service.post<any, ResponseData>(API.UPDATE_ORDER_ISFINISHED, { id })
}

export const reqQueryOrderById = (id: number) => {
  return service.get<any, Order>(API.QUERY_ORDER_BY_ID + id)
}