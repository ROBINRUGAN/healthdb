import request from "@/utils/request"
import type { AddEscortParams, } from "../escort/type"
import type { DeleteEvaluateParams, EvaluateListResponseData } from "./type"
import type { ResponseData } from "../type"

enum API{
  // 评论订单
  ADD_ESCORT = '/evaluate/add',
  // 删除评论
  DELETE_ESCORT = '/evaluate/delete',
  // 查询医院对应订单评价
  GET_ESCORT_BY_HID = '/evaluate/query/hospital/',
  // 用户查询自身做出的评价
  GET_ESCORT_BY_UID = '/evaluate/query/all/',
}

export const addEscort = (data: AddEscortParams) => {
  return request.post<any,ResponseData>(API.ADD_ESCORT, data)
}

export const deleteEscort = (data: DeleteEvaluateParams) => {
  return request.post<any,ResponseData>(API.DELETE_ESCORT, data)
}

export const getEscortByHid = (hid: string) => {
  return request.get<any,EvaluateListResponseData>(API.GET_ESCORT_BY_HID + hid)
}

export const getEscortByUid = (uid: string) => {
  return request.get<any,EvaluateListResponseData>(API.GET_ESCORT_BY_UID + uid)
}

