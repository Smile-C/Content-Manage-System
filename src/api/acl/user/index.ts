import request from "@/utils/request";
import { ALL_USER_Response_Data, UserData, AllRoleResponse, AllRole, SetRoleData } from "./type";
enum API {
    // 获取全部用户账户信息
    ALLUSER_URL = "/admin/acl/user/",
    // 新增用户接口
    ADD_USER = "/admin/acl/user/save",
    // 修改用户信息接口
    UPDATE_USER = "/admin/acl/user/update",
    // 获取全部职位，当前账号拥有职位
    ALLROLE_URL = "/admin/acl/user/toAssign/",
    // 根据用户ID分配用户角色
    SETROLE_URL = "/admin/acl/user/doAssignRole"
}

/**
 * 获取全部用户列表
 * @param page 
 * @param limit 
 * @returns 
 */
export const reqAllUser = (page: number, limit: number) => request.get<any, ALL_USER_Response_Data>(API.ALLUSER_URL + page + "/" + limit)

/**
 * 新增用户与修改用户信息接口
 */
export const reqAddOrUpdateUser = (data: UserData) => {
    if (data.id) {
        // 更新操作
        return request.put<any, any>(API.UPDATE_USER, data)
    } else {
        // 添加操作
        return request.post<any, any>(API.ADD_USER, data)
    }
}

/**
 * 获取全部职位以及当前用户包含职位
 */
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponse>(API.ALLROLE_URL + userId)

/**
 * 根据用户ID分配用户角色
 */

export const reqSetRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)
