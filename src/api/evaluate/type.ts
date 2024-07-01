import type { ResponseData } from '../type'

export interface Evaluate {
  avatar: string;
  content: string;
  createTime: string;
  id: number;
  nickname: string;
  oid: number;
  processLevel: number;
  serverLevel: number;
  starLevel: number;
  uid: number;
}

export type EvaluateList = Evaluate[]

export interface EvaluateResponseData extends ResponseData {
  data: Evaluate
}

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
