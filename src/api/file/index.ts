import service from "@/utils/request"
import type { FileResponseData } from "./type"

enum API{
  UPLOAD_FILE_API = '/file/upload'
}

export const reqUploadFile = (data: FormData) => {
  return service.post<any, FileResponseData>(API.UPLOAD_FILE_API, data)
}