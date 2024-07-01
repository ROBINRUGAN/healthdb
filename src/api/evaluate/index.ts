import request from '@/utils/request'
import type { AddEscortParams } from '../escort/type'
import type {
  AddEvaluateParams,
  DeleteEvaluateParams,
  Evaluate,
  EvaluateListResponseData,
  EvaluateResponseData
} from './type'
import type { ResponseData } from '../type'
import type { OrderListResponse } from '../order/type'

enum API {
  // 评论订单
  ADD_EVALUATE = '/evaluate/add',
  // 删除评论
  DELETE_EVALUATE = '/evaluate/delete',
  // 查询医院对应订单评价
  GET_EVALUATE_BY_HID = '/evaluate/query/hospital/',
  // 用户查询自身做出的评价
  GET_EVALUATE_BY_UID = '/evaluate/query/all/',
  // 查询已评价的订单信息
  GET_EVALUATE_ORDER = '/evaluate/query/orders',
  // 根据订单id查询评价
  GET_EVALUATE_BY_OID = '/evaluate/query/oid/'
}

export const addEvaluate = (data: AddEvaluateParams) => {
  return request.post<any, ResponseData>(API.ADD_EVALUATE, data)
}

export const deleteEscort = (data: DeleteEvaluateParams) => {
  return request.post<any, ResponseData>(API.DELETE_EVALUATE, data)
}

export const getEscortByHid = (hid: string) => {
  return request.get<any, EvaluateListResponseData>(API.GET_EVALUATE_BY_HID + hid)
}

export const getEvaluateByUid = (uid: string) => {
  return request.get<any, EvaluateListResponseData>(API.GET_EVALUATE_BY_UID + uid)
}

export const getEvaluatedOrder = (params: { uid: number }) => {
  return request.get<any, OrderListResponse>(API.GET_EVALUATE_ORDER, { params })
}

export const getEvaluateByOid = (params:{oid: number}) => {
  return request.get<any, EvaluateResponseData>(API.GET_EVALUATE_BY_OID ,{params})
}
