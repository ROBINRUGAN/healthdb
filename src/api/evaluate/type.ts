import type { ResponseData } from '../type'

export interface Evaluate {
  createTime: string
  id: number
  oid: number
  starLevel: number
  processLevel: number
  serverLevel: number
  content: string
  avatar?: string
  isDelete?: number
  nickname?: string
  uid?: number
  updateTime?: string
}

export type EvaluateList = Evaluate[]

export interface EvaluateListResponseData extends ResponseData {
  data: EvaluateList
}

export interface AddEvaluateParams {
  order_id: number
  uid: number
  starLevel: number
  processLevel: number
  serverLevel: number
  content: string
}

export interface DeleteEvaluateParams {
  evaluation_id: number
  uid: number
}
