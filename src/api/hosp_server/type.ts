import type { ResponseData } from "../type"

export interface HospitalServer {
  id: number
  name: string
  limit: number
  money: number
}

export type HospitalServerList = HospitalServer[]

export interface HospitalServerListResponseData extends ResponseData{
  data: HospitalServerList
}