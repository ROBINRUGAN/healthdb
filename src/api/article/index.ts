import request from '@/utils/request'

enum API {
  // 文章列表
  GET_ARTICLE_LIST = '/user/passage/all'
}

export const getArticleList = () => {
  return request.get(API.GET_ARTICLE_LIST)
}
