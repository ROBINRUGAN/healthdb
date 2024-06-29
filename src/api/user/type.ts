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
    nickname: string;
    id: string;
    isCompanion: number;
    isIdentified: number;
  };
}

export interface User {
  id: number;
  avatar?: string;
  nickname?: string;
  realname?: string;
  gender?: number;
  age?: number;
  idNumber?: string;
  telephone: string;
}

// 用户信息
export interface userInfoResponseData extends ResponseData {
  data: User
}

// 用户实名认证
export interface IdentifyParams {
  id: number;
  name: string;
  identity: string;
}

// 修改用户信息
export interface ModifyUserInfoParams {
  id: number;
  nickname?: string;
  realname?: string;
  age?: number;
  password?: string;
  gender?: number;
}

// 修改用户头像
export interface ModifyAvatarParams {
  id: number;
  avatar: string;
}

// 充值
export interface RechargeParams {
  id: number;
  money: number;
}