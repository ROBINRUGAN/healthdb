import request from "@/utils/request"
import type { AddEscortParams } from "./type"

enum API{
  // 申请陪诊师
  ADD_ESCORT = '/escort/add',
  // 根据id查询陪诊师信息
  GET_ESCORT_BY_ID = '/escort/get/my/',

}

export const addEscort = (data: AddEscortParams) => {
  return request.post(API.ADD_ESCORT, data)
}


export const getEscortById = (id: string) => {
  return request.get(API.GET_ESCORT_BY_ID + id)
}

