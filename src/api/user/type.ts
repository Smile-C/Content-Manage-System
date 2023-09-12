
/**
 * 用户登录类型
 */
export interface loginFromData {
    username: string,
    password: string
}

/**
 * 接口返回数据都有的类型
 */
interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


/**
 * 登录结果返回类型
 */
export interface loginResponseData extends ResponseData {
    data: string
}

/**
 * 获取用户信息返回值类型
 */
export interface getUserInfoResponse extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}

/**
 * 用户退出登录返回值类型
 */
export interface logoutResponseData extends ResponseData {
    data: null
}