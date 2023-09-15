export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface UserData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username?: string,
    password?: string,
    name?: string,
    phone?: null,
    roleName?: ""
}

export interface ALL_USER_Response_Data extends ResponseData {
    data: {
        records: UserData[],
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

/**
 * 一个职位的ts类型
 */

export interface RoleType {
    id?: string,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark: null
}


/**
 * 职位列表
 */
export type AllRole = RoleType[]

/**
 * 返回全部职位的ts接口类型
 */

export interface AllRoleResponse extends ResponseData {
    data: {
        assignRoles: AllRole,
        allRolesList: AllRole
    }
}

/**
 * 根据用户ID分配角色
 */
export interface SetRoleData {
    roleIdList: (string | undefined)[],
    userId: number
}
