import type { ResponseData } from "../type";

// 注册接口需要携带参数ts类型
export interface RegisterParams {
  telephone: string;
  password: string;
}

export interface registerResponseData extends ResponseData {

}

// 登录接口需要携带参数ts类型
export interface LoginParams {
  telephone: string;
  password: string;
}

export interface LoginResponseData extends ResponseData {
  data: {
    token: string;
    username: string;
    id: string;
    isCompanion: number;
    isIdentified: number;
  };
}

// 用户信息
export interface userInfoResponseData extends ResponseData {
  data: {

  };
}