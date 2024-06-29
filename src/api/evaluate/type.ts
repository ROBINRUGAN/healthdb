
export interface Evaluate {
  createTime: string
  id: number
  oid: number
  starLevel: number
  processLevel: number
  serverLevel: number
  content: string
}

export type EvaluateList = Evaluate[]

export interface EvaluateListResponseData {
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