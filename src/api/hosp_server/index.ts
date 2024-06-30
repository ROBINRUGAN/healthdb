import service from "@/utils/request"
import type { HospitalServerListResponseData } from "./type"

enum API {
  GET_HOSPITAL_SERVER_BY_HID = '/hospital_server/query/by/',
}

export const reqGetHospitalServerByHid = (id: number) => {
  return service.get<any, HospitalServerListResponseData>(API.GET_HOSPITAL_SERVER_BY_HID + id)
}