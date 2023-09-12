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