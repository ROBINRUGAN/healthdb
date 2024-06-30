import type { ResponseData } from '../type'

export interface ArticleResponse extends ResponseData {
  data: Article[]
}

export interface Article {
  avatar?: string
  content?: string
  createTime?: string
  id?: number
  isDelete?: number
  name?: string
  photo?: string
  position?: string
  title?: string
  updateTime?: string
}
