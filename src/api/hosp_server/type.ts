export interface HospitalServer {
  id: number
  name: string
  limit: number
  money: number
}

export type HospitalServerList = HospitalServer[]

export interface HospitalServerListResponseData {
  data: HospitalServerList
}