import type { ResponseData } from "../type"

export interface FileResponseData extends ResponseData {
  data: {
    fileUrl: string
  }
}