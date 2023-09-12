// 统一管理用户相关接口
import request from "@/utils/request";
import type { loginFromData, loginResponseData, getUserInfoResponse } from "./type";
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

/**
 * 登录接口
 * @param data 
 * @returns 
 */
export const reqLogin = (data: loginFromData) => {
    return request.post<any, loginResponseData>(API.LOGIN_URL, data);
}

/**
 * 根据token获取用户信息(不用传,再header中传输)
 * @returns 
 */
export const reqUserInfo = () => request.get<any, getUserInfoResponse>(API.USERINFO_URL)

/**
 * 根据token退出登录接口
 * @returns 
 */
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)