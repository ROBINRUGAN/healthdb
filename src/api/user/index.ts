import service from '@/utils/request'
import type { RegisterParams, registerResponseData, LoginParams, LoginResponseData, ModifyUserInfoParams, IdentifyParams, ModifyAvatarParams, RechargeParams, userInfoResponseData } from './type'
import type { ResponseData } from '../type'

enum API {
  REGISTER_API = '/user/register',
  LOGIN_API = '/user/login',
  USER_INFO_API = '/user/information',
  IDENTIFY_API = '/user/identify',
  MODIFY_USER_INFO_API = '/user/update/other',
  MODIFY_USER_AVATAR_API = '/user/update/avatar',
  RECHARGE_API = '/user/recharge',


}

export const reqRegister = (data: RegisterParams) => {
  return service.post<any, registerResponseData>(API.REGISTER_API, data)
}

export const reqLogin = (data: LoginParams) => {
  return service.post<any, LoginResponseData>(API.LOGIN_API, data)
}

export const reqUserInfo = () => {
  return service.get<any, userInfoResponseData>(API.USER_INFO_API)
}

export const reqIdentify = (data: IdentifyParams) => {
  return service.post<any,ResponseData>(API.IDENTIFY_API, data)
}

export const reqModifyUserInfo = (data: ModifyUserInfoParams) => {
  return service.post<any,ResponseData>(API.MODIFY_USER_INFO_API, data)
}

export const reqModifyUserAvatar = (data: ModifyAvatarParams) => {
  return service.post<any,ResponseData>(API.MODIFY_USER_AVATAR_API, data)
}

export const reqRecharge = (data: RechargeParams) => {
  return service.post<any,ResponseData>(API.RECHARGE_API, data)
}

